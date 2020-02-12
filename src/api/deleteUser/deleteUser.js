import { prisma } from "../../../generated/prisma-client";
export default {
  Mutation: {
    deleteUser: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = request.user;

      try {
        await prisma.deleteUser({ id });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
