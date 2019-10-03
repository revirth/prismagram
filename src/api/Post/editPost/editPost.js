import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

var actions = {
  EDIT: "EDIT",
  DELETE: "DELETE"
};

export default {
  Mutation: {
    editPost: async (_, args, { request }) => {
      isAuthenticated(request);

      const { user } = request;
      const { id, caption, location, action } = args;

      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === actions.EDIT)
          return await prisma.updatePost({
            where: { id },
            data: { caption, location }
          });
        else if (action === actions.DELETE) {
          return await prisma.deletePost({ id });
        }
      } else {
        throw Error("You can't edit this post");
      }
    }
  }
};
