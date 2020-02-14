import { prisma } from "../../../generated/prisma-client";

export default {
  Query: {
    checkUniqueID: async (_, args) => {
      const { name } = args;
      try {
        const exists = await prisma.user({ name });
        console.log(exists);
        if (exists) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
