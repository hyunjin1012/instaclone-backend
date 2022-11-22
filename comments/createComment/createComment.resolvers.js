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
  const newComment = await client.comment.create({
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
  if (newComment) {
    return {
      ok: true,
      error: null,
      newComment,
      id: newComment.id
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