import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    getMe: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      return {
        user: userProfile
      };
    }
  }
};
