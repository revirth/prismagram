import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request }) => {
      isAuthenticated(request);

      const { user } = request;
      const { id } = args;
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id }
      });

      if (!canSee) throw Error("You can't see this room");

      return await prisma.room({ id }).$fragment(ROOM_FRAGMENT);
    }
  }
};
