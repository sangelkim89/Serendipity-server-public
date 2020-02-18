import '../../env';
export default {
	Mutation: {
		confirmText: async (_, args) => {
			const { phone } = args;
			let newPhone = phone;
			newPhone = newPhone.slice(1);
			newPhone = '+01182' + newPhone;

			const accountSID = process.env.TWILIO_ACCOUNT_SID;
			const authToken = process.env.TWILIO_AUTH_TOKEN;
			const textSecretNumber = Math.floor(Math.random() * 99999) + 11111;
			const secretString = textSecretNumber.toString();
			const client = require('twilio')(accountSID, authToken);
			try {
				await client.messages.create({
					to: newPhone,
					from: process.env.TWILIO_FROM_NUMBER,
					body: `Hello! Your secret code is: ${secretString}. Copy paste this on the app to verify`
				});
				return secretString;
			} catch (e) {
				console.log(e);
				throw Error('Failed to send secret character.');
			}
		}
	}
};
