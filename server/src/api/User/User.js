import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`,
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      return await prisma.$exists.user({
        AND: [{ id: parentId }, { followers_some: { id: user.id } }]
      });
    },
    isMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      return user.id === parentId;
    },
    followings: ({ id }) => prisma.user({ id }).followings(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    followerCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_none: { id } } })
        .aggregate()
        .count(),
    posts: ({ id }) => prisma.user({ id }).posts(),
    postCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms()
  }
};
