import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";

export default {
  Subscription: {
    newRoom: {
      subscribe: (_, args) => {
        const { id } = args;

        return prisma.$subscribe
          .room({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  participants_some: {
                    id
                  }
                }
              }
            ]
          })
          .node()
          .$fragment(ROOM_FRAGMENT);
      },
      resolve: payload => {
        return payload;
      }
    }
  }
};
