import { TSignUpData, TSigninData } from "../../../types/auth.type";
import bcrypt from "bcryptjs";
import { Secret } from "jsonwebtoken";
import jwtHelper from "../../../utils/jwtHelper";
import config from "../../../config";

export const authMutation = {
  signup: async (parent: any, args: TSignUpData, { prisma }: any) => {
    const { email, name, password } = args;

    let error;

    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return {
        error: "User Already Exist With This Email Address Try Again",
      };
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    if (args?.bio) {
      await prisma.profile.create({
        data: {
          userId: newUser.id,
          bio: args.bio,
        },
      });
    }

    const userData = {
      email,
      userId: newUser.id,
    };

    const token = await jwtHelper.generateToken(
      userData,
      config.jwt.secret as Secret,
      config.jwt.expiresIn as string
    );

    return {
      token,
      error,
    };
  },

  signin: async (parent: any, args: TSigninData, { prisma }: any) => {
    const { email, password } = args;
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExist) {
      return {
        error: "User not exist, Please try again",
        token: null,
      };
    }

    const matchedPassword = await bcrypt.compare(password, userExist.password);

    if (!matchedPassword) {
      return {
        error: "Password not matched",
        token: null,
      };
    }

    const userData = {
      email: userExist.email,
      userId: userExist.id,
    };

    const token = await jwtHelper.generateToken(
      userData,
      config.jwt.secret as Secret,
      config.jwt.expiresIn as string
    );

    return {
      error: null,
      token,
    };
  },
};
