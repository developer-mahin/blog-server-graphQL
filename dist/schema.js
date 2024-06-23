"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

  type Query {
    user(userId: ID!): User
    profile(userId:ID!): Profile
    allUsers: [User]
    posts: [Post]
  }

  type Mutation {
    signup(
        name: String!,
        email: String!,
        password: String!
        bio:String
    ):AuthType


    signin (
      email:String!
      password: String!
    ): AuthType

  }

  type AuthType {
    error:String
    token:String
  }

  type Post {
    id:ID!
    title:String!
    des:String!
    isPublished: Boolean!
    createdAt:String!
    user: User!
  }

  type User {
    id:ID!
    name:String!
    email:String!
    post: [Post]
    profile: Profile
    createdAt:String!
  }
  
  type Profile {
    id:ID!
    bio:String!
    createdAt:String!
    user: User!
  }


`;
