import client from "../../client";
import { protectedResolver } from "../users.utils";

const followFn = async (_, {username}, {loggedInUser}) => {

  try {
    const ok = await client.user.findUnique({where: {username}});
    if (!ok) {
      return {
        ok: false,
        error: "The username does not exist."
      }
    }
    await client.user.update({
      where: {
        id:loggedInUser.id
      },
      data: {
        following: {
          connect: {
            username
          }
          }
        }
      }
    )
      return {
        ok: true
      }
  } catch(e) {
    console.log(e);
    return {
      ok: false,
      error: "Cannot follow the username."
    }
  }
  
};
  


export default {
  Mutation: {
    followUser: protectedResolver(followFn)
  }
}