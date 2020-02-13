import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    deleteUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = request.user;
      console.log(id);
      try {
        await prisma.deleteUser({ id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
