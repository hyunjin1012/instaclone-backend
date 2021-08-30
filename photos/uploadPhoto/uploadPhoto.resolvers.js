import {protectedResolver} from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";
import client from "../../client"
import { processHashtags } from "../photos.utils";
import { FieldsOnCorrectTypeRule } from "graphql";

const uploadPhotoFn = async (_, {file, caption}, {loggedInUser}) => {
  let hashtagObj = [];
  if (caption) {
    hashtagObj = processHashtags(caption)
    // console.log(hashtagObj)

    //["banana", "apple"].map((item) => `I love ${item}`)
    // (2) ["I love banana", "I love apple"]

  }
  const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads")
  const photo = client.photo.create({
    data: {
      file:fileUrl,
      caption,
      user: {
        connect: {
          id: loggedInUser.id
        }
      },
      hashtags: {
        connectOrCreate: hashtagObj
      }
      // ...(hashtagObj.length > 0 && {
      //   hashtags: {
      //     connectOrCreate: hashtagObj
      //   }
      // })
    }
  })
  return {
    ok: true,
    error: null,
    photo
  }
}

export default {
  Mutation: {
    uploadPhoto: protectedResolver(uploadPhotoFn)
  }
}