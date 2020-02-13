import { prisma } from "../../../generated/prisma-client";
import { MESSAGES_FRAGMENT } from "../../fragments";
export default {
  Query: {
    getMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId } = args;
      try {
        const message = await prisma
          .messages({
            where: {
              room: {
                id: roomId
              }
            }
          })
          .$fragment(MESSAGES_FRAGMENT);
        return message;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
