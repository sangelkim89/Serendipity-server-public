import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";
export default {
  Query: {
    getRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId } = args;

      const room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);

      return room;
    }
  }
};
