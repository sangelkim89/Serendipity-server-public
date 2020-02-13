import { prisma } from "../../../generated/prisma-client";
import { generateToken } from "../../utils";
export default {
  Mutation: {
    signIn: async (_, args) => {
      const { email, password } = args;

      const user = await prisma.user({ email });
      console.log("user : ", user);
      if (user.password === password) {
        return generateToken(user.id);
      } else {
        throw new Error("Can`t sign in");
      }
    }
  }
};
