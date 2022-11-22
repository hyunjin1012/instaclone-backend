import {gql} from "apollo-server";

export default gql `
  type Query {
<<<<<<< HEAD
    seeFeed(offset:Int!): [Photo]
=======
    seeFeed: [Photo]
>>>>>>> 21ec01b1797b127a147b0c744c3c8cf8a692c19a
  }
`