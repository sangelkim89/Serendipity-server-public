// import { prisma } from '../../../generated/prisma-client';
import { sendSecretMail, generateSecret } from "../../utils";
export default {
  Mutation: {
    confirmEmail: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();

      try {
        await sendSecretMail(email, loginSecret);
        return loginSecret;
        //client에서  loginSecret을 받아 state값으로 저장;
        //confirm button click =>  if(this.state.loginSecret===input.Ccurrent.value) 확인 제출;;;
      } catch (error) {
        throw Error("Failed to send email");
      }
    }
  }
};
