import { prisma } from "../../../generated/prisma-client";
import { MESSAGES_FRAGMENT } from "../../fragments";
export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node()
          .$fragment(MESSAGES_FRAGMENT);
      },
      resolve: payload => payload
    }
  }
};
