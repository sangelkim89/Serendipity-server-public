import { prisma } from "../../../generated/prisma-client";

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
          .node();
      },
      resolve: payload => payload
    }
  }
};
