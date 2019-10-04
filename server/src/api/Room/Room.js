import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: async (parent, _) =>
      await prisma.room({ id: parent.id }).participants(),
    messages: async (parent, _) =>
      await prisma.room({ id: parent.id }).messages()
  }
};
