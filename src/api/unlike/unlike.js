import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    unlike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { selectedId } = args;

      try {
        // mylike가 존재 하는지 확인하여  likeUser  boolean값을 넣는다.
        const likeUser = await prisma.$exists.user({
          AND: [
            {
              id: user.id
            },
            {
              myLikes_some: {
                id: selectedId
              }
            }
          ]
        });

        if (likeUser) {
          //matchList에서 실행 시키는 경우.
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              // 해당 유저와 disconnect시키기
              myLikes: {
                disconnect: {
                  id: selectedId
                }
              },
              //해당 유저  Unlikes추가

              myUnlikes: {
                connect: {
                  id: selectedId
                }
              }
            }
          });
          return true;
        } else {
          //huntLIst에서 실행시키는 경우
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              myUnlikes: {
                connect: {
                  id: selectedId
                }
              }
            }
          });
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
