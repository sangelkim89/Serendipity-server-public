import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, birth, companyName, companyRole, bio, password } = args;
      try {
        await prisma.updateUser({
          data: {
            password,
            birth,
            companyName,
            companyRole,
            bio
          },
          where: {
            id
          }
        });
        return true;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};
