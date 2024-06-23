import jwt, { Secret } from "jsonwebtoken";

type TPayload = {
  email: string;
  userId: string;
};

export const generateToken = async (
  payload: TPayload,
  secret: Secret,
  expiresIn: string
) => {
  try {
    return await jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    console.error(error);
  }
};
