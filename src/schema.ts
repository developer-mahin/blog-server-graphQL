export const typeDefs = `#graphql

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

    createPost(
      title:String!
      des:String!
    ): PostType

    updatePost(
      postId: ID!
      title:String
      des:String
    ):PostType

    deletePost(
      postId:ID!
    ):PostType

    updatePublishStatus(
      postId:ID! 
      isPublished:Boolean!
    ): PostType

  }

  type AuthType {
    error:String
    token:String
  }

  type PostType {
    error:String
    post:Post
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
