import {gql} from "apollo-server"

export default gql `
  type Comment {
    id: Int!
    payload: String!
    photo: Photo!
    user: User!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`