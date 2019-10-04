import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, args, { request }) => {
      isAuthenticated(request);

      const { user } = request;

      return {
        user: await prisma.user({ id: user.id }),
        posts: await prisma.user({ id: user.id }).posts()
      };
    }
  }
};
