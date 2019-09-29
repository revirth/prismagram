import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { id } = args;

      return {
        user: await await prisma.user({ id }),
        posts: await await prisma.user({ id }).posts()
      };
    }
  }
};
