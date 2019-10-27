import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { userName } = args;

      return await prisma.user({ userName });
    }
  }
};
