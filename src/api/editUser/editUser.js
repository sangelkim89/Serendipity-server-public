import { prisma } from "../../../generated/prisma-client";
import crypto from "crypto";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { companyName, companyRole, bio, password, geoLocation, tags, distance } = args;
      const shasum = crypto.createHash("sha1");
      shasum.update(password);
      const output = shasum.digest("hex");
      const parseTags = JSON.parse(tags);
      try {
        await prisma.updateUser({
          data: {
            password: output,
            geoLocation,
            companyName,
            companyRole,
            tags: { set: parseTags },
            bio,
            distance
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
