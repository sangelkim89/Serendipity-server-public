import { prisma } from "../../../generated/prisma-client";
import "../../env";
export default {
  Mutation: {
    adminDeleteAccount: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      if (request.user.email === process.env.ADMIN_EMAIL) {
        try {
          await prisma.deleteUser({ id });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      } else {
        throw new Error("You are not authorized to do this.");
      }
    }
  }
};
