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
<<<<<<< HEAD
  const newComment = await client.comment.create({
=======
  const comment = await client.comment.create({
>>>>>>> 21ec01b1797b127a147b0c744c3c8cf8a692c19a
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
<<<<<<< HEAD
  if (newComment) {
    return {
      ok: true,
      error: null,
      newComment,
      id: newComment.id
=======
  if (comment) {
    return {
      ok: true,
      error: null,
      comment
>>>>>>> 21ec01b1797b127a147b0c744c3c8cf8a692c19a
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