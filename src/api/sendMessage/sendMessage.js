import { prisma } from "../../../generated/prisma-client";
// import { ROOM_FRAGMENT } from "../../fragments";
export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
<<<<<<< HEAD
=======

>>>>>>> 8101860e57cf5ac5fb17b2bf59c8123a4dde626f
      try {
        const createMessage = await prisma.createMessage({
          text: message,
          from: {
            connect: { id: user.id }
          },
          to: {
            connect: {
              id: toId
            }
          },
          room: {
            connect: {
              id: roomId
            }
          }
        });
        await prisma.updateRoom({
          data: {
            participants: {
              connect: [{ id: user.id }, { id: toId }]
            }
          },
          where: {
            id: roomId
          }
        });
        return createMessage;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

// import { prisma } from "../../../generated/prisma-client";
// // import { ROOM_FRAGMENT } from "../../fragments";
// export default {
//   Mutation: {
//     sendMessage: async (_, args, { request, isAuthenticated }) => {
//       isAuthenticated(request);
//       const { user } = request;
//       const { roomId, message, toId } = args;
//       return prisma.createMessage({
//         text: message,
//         from: {
//           connect: { id: user.id }
//         },
//         to: {
//           connect: {
//             id: toId
//           }
//         },
//         room: {
//           connect: {
//             id: roomId
//           }
//         }
//       });
//     }
//   }
// };
