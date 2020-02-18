import { prisma } from "../../../generated/prisma-client";
import { sendSecretMail, generateSecret } from "../../utils";
import { forbiddenEmails } from "../../email";
export default {
  Mutation: {
    confirmEmail: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      const exists = await prisma.user({ email });
      //금지된 이메일 확인하기
      for (let i = 0; i < forbiddenEmails.length; i++) {
        const splitEmail = email.split("@");

        if (forbiddenEmails[i] === splitEmail[1]) {
          return "forbiddenEmail";
        }
      }
      // 해당email이 이미 존재하는지 확인하기
      //통과 되면 loginSecret 발급
      if (exists) {
        return "Email already exists!";
      } else if (!exists) {
        try {
          await sendSecretMail(email, loginSecret);
          return loginSecret;
        } catch (error) {
          throw Error("Failed to send email");
        }
      }
    }
  }
};
