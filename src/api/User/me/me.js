import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    me: async (_, args, { request }) => {
      isAuthenticated(request);

      const { user } = request;

      return await prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
    }
  },
  User: {
    fullName: parent => `${parent.firstName} ${parent.lastName}`
  }
};
