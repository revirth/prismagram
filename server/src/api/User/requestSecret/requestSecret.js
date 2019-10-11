import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;

      const loginSecret = generateSecret();

      console.log("loginSecret :", loginSecret);

      try {
        await prisma.updateUser({ data: { loginSecret }, where: { email } });

        sendSecretMail(email);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
