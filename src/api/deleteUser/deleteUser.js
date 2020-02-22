import { prisma } from "../../../generated/prisma-client";
export default {
  Mutation: {
    deleteUser: async (_, args, { request, isAuthenticated }) => {
      //자기자신이 회원탈퇴
      isAuthenticated(request);
      const { id } = request.user;
    }
  }
};
/*
 try {
        await prisma.deleteUser({ id });
        return true;
      } catch (error) {
        return false;
      }
      */
