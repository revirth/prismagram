import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../passport";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });

      if (user.loginSecret === secret) {
        // reset loginSecret
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: "" }
        });

        return generateToken(user.id);
      } else {
        throw Error("Wrong email or secret key");
      }
    }
  }
};
