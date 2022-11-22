import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const editCommentFn = async (_, {id, payload}, {loggedInUser}) => {
  const {user}= await client.comment.findUnique({
    where: {id},
    select: {user: true}
  })
  if (!user) {
    return {
      ok: false,
      error: "Comment not found."
    }
  } else
  // console.log(user)
  // console.log(loggedInUser)
  if (user.id === loggedInUser.id) {
    const editedComment = await client.comment.update({
      where: {id},
      data: {payload}
    })
    if (editedComment) {
      return {
        ok: true,
        error: null,
        comment: editedComment
      }
    } else {
      return {
        ok: false,
        error: "Comment not edited."
      }
    }
  } else {
    return {
      ok: false,
      error: "You cannot edit this comment."
    }
  }
}

export default {
  Mutation: {
    editComment: protectedResolver(editCommentFn)
  }
}