import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import jwtHelper from "./utils/jwtHelper";
import config from "./config";
import { JwtPayload, Secret } from "jsonwebtoken";

const prisma = new PrismaClient();

interface UserInfo {
  email: string;
  userId: string;
  iat: number;
  exp: number;
}

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: UserInfo | JwtPayload;
}

async function main() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<Context> => {
      const userInfo = jwtHelper.decodeToken(
        req.headers.authorization as string,
        config.jwt.secret as Secret
      ) as JwtPayload;

      return {
        prisma,
        userInfo,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main();
