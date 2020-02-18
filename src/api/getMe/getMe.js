import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    getMe: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });
      return userProfile;
    }
  }
};
