import { prisma } from "../../../generated/prisma-client";
import { MESSAGES_FRAGMENT } from "../../fragments";
export default {
  Query: {
    getMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      try {
        const message = await prisma
          .messages({
            where: {
              room: {
                participants_some: {
                  id
                }
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
