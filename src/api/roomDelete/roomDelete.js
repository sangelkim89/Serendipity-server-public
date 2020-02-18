import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    roomDelete: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const { roomId } = args;
      try {
        await prisma.deleteRoom({
          id: roomId
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
