import {gql} from "apollo-server";
import express from "express"
import { graphqlHTTP } from "express-graphql";


export default gql`
 type User {
   id: Int!
   firstName: String!
   lastName: String
   email: String!
   username: String!
   createdAt: String!
   updatedAt: String!
   bio: String
   avatar: Upload
   following: [User]
   followers: [User]
   totalFollowing: Int!
   totalFollowers: Int!
   isMe: Boolean!
   isFollowing: Boolean!
   photos (page: Int!): [Photo]
 }`

 