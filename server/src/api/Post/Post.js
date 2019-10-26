import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      return await prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id: parentId } }]
      });
    },
    likeCount: async parent =>
      await prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count(),
    commentCount: async parent =>
      await prisma
        .commentsConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count(),
    files: async parent => await prisma.post({ id: parent.id }).files(),
    comments: async parent => await prisma.post({ id: parent.id }).comments(),
    user: async parent => await prisma.post({ id: parent.id }).user()
  }
};
