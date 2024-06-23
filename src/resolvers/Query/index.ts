export const Query = {
  allUsers: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },

  user: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: args.userId,
      },
    });
  },

  profile: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: args.userId,
      },
    });
  },

  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany();
  },
};
