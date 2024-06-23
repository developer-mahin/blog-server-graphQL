import { TPost } from "../../../types/post.type";

export const postMutation = {
  createPost: async (parent: any, args: TPost, { prisma, userInfo }: any) => {
    const { des, title } = args;

    if (!userInfo) {
      return {
        error: "User Not Found",
        post: null,
      };
    }

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

  updatePost: async (
    parent: any,
    args: Partial<TPost & { postId: string }>,
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        error: "Forbidden Access",
        post: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });

    if (!user) {
      return {
        error: "User not found",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: args.postId,
      },
    });

    if (!post) {
      return {
        error: "post not found",
        post: null,
      };
    }

    if (user.id !== post.userId) {
      return {
        error: "You are not the owner",
        post: null,
      };
    }

    const updatePost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: {
        title: args.title,
        des: args.des,
      },
    });

    return {
      error: null,
      post: updatePost,
    };
  },

  deletePost: async (
    parent: any,
    args: { postId: string },
    { prisma, userInfo }: any
  ) => {
    if (!userInfo) {
      return {
        error: "Forbidden Access",
        post: null,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });

    if (!user) {
      return {
        error: "User not found",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: args.postId,
      },
    });

    if (!post) {
      return {
        error: "post not found",
        post: null,
      };
    }

    if (user.id !== post.userId) {
      return {
        error: "You are not the owner",
        post: null,
      };
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: args.postId,
      },
    });

    return {
      error: null,
      post: deletePost,
    };
  },
};
