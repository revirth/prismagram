import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { userName, email, firstName = "", lastName = "", bio = "" } = args;

      const isExist = await prisma.$exists.user({
        OR: [{ userName }, { email }]
      });
      if (isExist) throw Error("The username already exists");

      try {
        await prisma.createUser({
          userName,
          email,
          firstName,
          lastName,
          bio
        });

        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
