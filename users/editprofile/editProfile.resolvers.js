import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import {createWriteStream} from "fs";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
  _,
  {firstName, lastName, username, email, password:newPassword, bio, avatar}, {loggedInUser}
) => {
  // console.log(avatar)
  let avatarUrl = null;
  if(avatar){
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars")
    // const {filename, createReadStream} = await avatar;
    // console.log(createReadStream);
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // const readStream = createReadStream();
    // const writeStream = createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // );
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`;
    // console.log(avatarUrl)
  }
  // console.log(avatarUrl)
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: 
      {id: loggedInUser.id}
    ,
    data: {
      firstName, lastName, username, email, ...(uglyPassword && {password: uglyPassword}), bio, ...(avatarUrl && {avatar: avatarUrl}),
    }
  });
  // console.log(updatedUser)
  if(updatedUser) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile."
    }
  }
}

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn)
  }
}