import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    getUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      // const { user } = request;
      const userProfile = await prisma.user({ id });
      return userProfile;
    }
  }
};
