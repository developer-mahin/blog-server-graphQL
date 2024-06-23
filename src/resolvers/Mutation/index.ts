import { authMutation } from "./Features/authMutation";
import { postMutation } from "./Features/postMutation";

export const Mutation = {
  ...authMutation,
  ...postMutation,
};
