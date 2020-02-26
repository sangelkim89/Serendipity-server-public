import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    getUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });

      return userProfile;
    }
  }
};
