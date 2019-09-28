import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { id } = args;

      return await prisma.user({ id });
    }
  },
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`
  }
};
