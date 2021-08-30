import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

const deleteCommentFn = async (_, {id}, {loggedInUser}) => {
  const {user} = await client.comment.findUnique({
    where: {id},
    select: {user: {select: {id: true}}}
    
  
  })
  // console.log(user)
  // console.log(loggedInUser)
  if (!user) {
    return {
      ok: false,
      error: "Comment not found"
    }
  } else
  if (user.id === loggedInUser.id) {
    const deletedComment = await client.comment.delete({
      where: {id}
    })
    console.log(deletedComment)
    if (deletedComment) {
      return {
        ok: true,
        error: null
      } 
    } else {
      return {
        ok: false,
        error: "Comment not deleted."
      }
    }
  } else {
    return {
      ok: false,
      error: "You cannnot delete this comment."
    }
  }
}

export default {
  Mutation: {
    deleteComment: protectedResolver(deleteCommentFn)
  }
}

//nico's

// export default {
//   Mutation: {
//     deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
//       const comment = await client.comment.findUnique({
//         where: {
//           id,
//         },
//         select: {
//           userId: true,
//         },
//       });
//       if (!comment) {
//         return {
//           ok: false,
//           error: "Comment not found.",
//         };
//       } else if (comment.userId !== loggedInUser.id) {
//         return {
//           ok: false,
//           error: "Not authorized.",
//         };
//       } else {
//         await client.comment.delete({
//           where: {
//             id,
//           },
//         });
//         return {
//           ok: true,
//         };
//       }
//     }),
//   },
// };