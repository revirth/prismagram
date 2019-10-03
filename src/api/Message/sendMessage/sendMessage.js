import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toUserId } = args;

      if (user.id === toUserId) return null;

      const room =
        roomId === undefined
          ? await prisma
              .createRoom({
                participants: {
                  connect: [{ id: toUserId }, { id: user.id }]
                }
              })
              .$fragment(ROOM_FRAGMENT)
          : await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);

      if (!room) throw Error("Room not found");

      return await prisma.createMessage({
        text: message,
        from: { connect: { id: user.id } },
        to: {
          connect: {
            id: toUserId
              ? toUserId
              : room.participants.filter(p => p.id !== user.id)[0].id
          }
        },
        room: { connect: { id: room.id } }
      });
    }
  }
};
