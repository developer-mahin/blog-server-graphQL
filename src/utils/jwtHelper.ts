import jwt, { Secret } from "jsonwebtoken";

type TPayload = {
  email: string;
  userId: string;
};

const generateToken = async (
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

const decodeToken = (token: string, secret: Secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error(error);
  }
};

export default {
  generateToken,
  decodeToken,
};
