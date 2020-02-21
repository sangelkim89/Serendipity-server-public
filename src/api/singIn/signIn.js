import { prisma } from "../../../generated/prisma-client";
import { generateToken } from "../../utils";
import crypto from "crypto";
export default {
  Mutation: {
    signIn: async (_, args) => {
      const { email, password } = args;

      // 해시 생성
      const shasum = crypto.createHash("sha1");
      shasum.update(password);
      const output = shasum.digest("hex");
      //저장된 유저 정보 가져오기
      const user = await prisma.user({ email });
      // 해슁 비교하기
      if (user.password === output) {
        return JSON.stringify({ token: generateToken(user.id), id: user.id });
      } else {
        throw new Error("Can`t sign in");
      }
    }
  }
};
