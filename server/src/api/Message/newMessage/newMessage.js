import { subscribe } from "graphql";
import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args, { request }) => {
        // isAuthenticated(request);

        // const { user } = request;
        const { roomId } = args;

        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  AND: [{ room: { id: roomId } }]
                }
              }
            ]
          })
          .node();
      },
      resolve: payload => payload
    }
  }
};
