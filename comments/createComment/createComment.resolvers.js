import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const createCommentFn = async (_, {photoId, payload}, {loggedInUser}) => {
  const ok = await client.photo.findUnique({where: {id: photoId}, select: {id: true}});
  // console.log(ok)
  if (!ok) {
    return {
      ok: false,
      error: "Photo not found."
    }
  }
  const comment = await client.comment.create({
    data: {
      payload,
      photo: {
        connect: {
          id: photoId
        }
      },
      user: {
        connect: {
          id: loggedInUser.id
        }
      },
    }
    
  })
  if (comment) {
    return {
      ok: true,
      error: null,
      comment
    }
  } else {
    return {
      ok: false,
      error: "Comment not created."
    }
  }
}

export default {
  Mutation: {
    createComment: protectedResolver(createCommentFn)
  }
}