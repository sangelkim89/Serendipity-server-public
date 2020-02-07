import { signOutToken } from '../../utils';
export default {
	Mutation: {
		logOut: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			return signOutToken(user.id);
		}
	}
};
