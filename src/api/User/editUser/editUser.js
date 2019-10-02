import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request }) => {
      isAuthenticated(request);

      const { email, firstName, lastName, bio, avatar } = args;
      const { user } = request;

      return await prisma.updateUser({
        where: { id: user.id },
        data: { email, firstName, lastName, bio, avatar }
      });
    }
  }
};
