import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const followings = await prisma.user({ id: user.id }).followings();
      const followingIds = followings.map(u => u.id);

      const posts = await prisma.posts({
        where: { user: { id_in: [...followingIds, user.id] } },
        orderBy: "createdAt_DESC"
      });

      return posts;
    }
  }
};
