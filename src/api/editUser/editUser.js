import { prisma } from "../../../generated/prisma-client";
import crypto from "crypto";
export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { birth, companyName, companyRole, bio, password } = args;

      // 해시 생성
      const shasum = crypto.createHash("sha1");
      shasum.update(password);
      const output = shasum.digest("hex");

      try {
        await prisma.updateUser({
          data: {
            password: output,
            birth,
            companyName,
            companyRole,
            bio
          },
          where: {
            id: request.user.id
          }
        });
        return true;
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};
