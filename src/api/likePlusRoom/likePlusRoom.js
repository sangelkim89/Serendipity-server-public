import { prisma } from "../../../generated/prisma-client";
export default {
  Mutation: {
    likeUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      //please
      const { user } = request;
      const { selectedId } = args;
      try {
        const exists = await prisma.$exists.user({
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
        if (!exists) {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              myLikes: {
                connect: {
                  id: selectedId
                }
              }
            }
          });
        } else if (exists) {
          return "you already like each other!";
        }
        const youLikeMe = await prisma.$exists.user({
          AND: [
            {
              id: selectedId
            },
            {
              myLikes_some: {
                id: user.id
              }
            }
          ]
        });
        const mylikeBy = await prisma.$exists.user({
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
        // 서로 liked 가 존재하여 createRoom 생성하기
        if (youLikeMe && mylikeBy) {
          //   const { user } = request;
          //   const { selectedId } = args;
          const room = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, { id: selectedId }]
            }
          });
          return `${room.id}`;
        } else {
          return "The request has been successfully processed.";
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};
