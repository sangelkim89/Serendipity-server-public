import { prisma } from '../../../generated/prisma-client';

export default {
	Mutation: {
		signUp: async (_, args) => {
			try {
				const {
					name,
					phone,
					password,
					email,
					gender,
					birth,
					bio,
					companyName,
					companyRole,
					profileImg,
					cardImg,
					geoLocation,
					loginSecret,
					tags
				} = args;
				const user = await prisma.createUser({
					name,
					phone,
					password,
					email,
					gender,
					birth,
					bio,
					companyName,
					companyRole,
					profileImg,
					cardImg,
					geoLocation,
					loginSecret,
					tags
				});

				return user;
			} catch (error) {
				console.log(error);
			}
		}
	}
};
