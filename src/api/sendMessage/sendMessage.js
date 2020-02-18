import { prisma } from "../../../generated/prisma-client";
// import { ROOM_FRAGMENT } from "../../fragments";
export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: {
            id: toId
          }
        },
        room: {
          connect: {
            id: roomId
          }
        }
      });
    }
  }
};
