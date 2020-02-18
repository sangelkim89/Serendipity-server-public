import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createReport: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        user: { id: userId }
      } = request;
      const { text, optionText, toId } = args;
      try {
        //like을 끊어내고  disLike 추가
        await prisma.updateUser({
          where: { id: userId },
          data: {
            myLikes: {
              disconnect: {
                id: toId
              }
            },
            myUnlikes: {
              connect: {
                id: toId
              }
            }
          }
        });
        //신고 생성해주기
        await prisma.createReportMessage({
          text,
          optionText,
          to: {
            connect: {
              id: toId
            }
          },
          from: {
            connect: {
              id: userId
            }
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
