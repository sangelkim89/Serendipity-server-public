import { prisma } from "../../../generated/prisma-client";
import crypto from "crypto";
export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { companyName, companyRole, bio, password, geoLocation, tags, distance } = args;

      // 해시 생성
      const shasum = crypto.createHash("sha1");
      shasum.update(password);
      const output = shasum.digest("hex");
      const parseTags = JSON.parse(tags);
      try {
        if (password === "") {
          await prisma.updateUser({
            data: {
              geoLocation,
              companyName,
              companyRole,
              bio,
              distance,
              tags: { set: parseTags }
            },
            where: {
              id: request.user.id
            }
          });
        } else {
          await prisma.updateUser({
            data: {
              password: output,
              geoLocation,
              companyName,
              companyRole,
              bio,
              distance,
              tags: { set: parseTags }
            },
            where: {
              id: request.user.id
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
