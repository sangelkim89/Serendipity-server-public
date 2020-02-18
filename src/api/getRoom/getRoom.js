import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";
export default {
  Mutation: {
    getRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      try {
        const room = await prisma
          .rooms({
            where: {
              participants_some: {
                id
              }
            }
          })
          .$fragment(ROOM_FRAGMENT);

        return room;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
