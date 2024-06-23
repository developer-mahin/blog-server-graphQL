import { TPost } from "../../types/post.type";
import { authMutation } from "./Features/authMutation";

export const Mutation = {
  ...authMutation,

  createPost: async (parent: any, args: TPost, { prisma, userInfo }: any) => {
    const { des, title } = args;

    if (!des || !title) {
      return {
        error: "Something went wrong, Please try again",
        post: null,
      };
    }

    const postData = await prisma.post.create({
      data: {
        des,
        title,
        isPublished: false,
        userId: userInfo.userId,
      },
    });

    return {
      error: null,
      post: postData,
    };
  },
};
