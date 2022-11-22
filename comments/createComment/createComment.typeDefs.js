import {gql} from "apollo-server";

export default gql `
  type CreateCommentResult {
    ok: Boolean!
    error: String
<<<<<<< HEAD
    newComment: Comment
    id: Int
=======
    comment: Comment
>>>>>>> 21ec01b1797b127a147b0c744c3c8cf8a692c19a
  }

  type Mutation {
    createComment(photoId: Int!, payload: String): CreateCommentResult!
  }
`