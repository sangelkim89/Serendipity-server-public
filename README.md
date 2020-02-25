## 1. Intro

- **Team Name:** Serengeti
- **Project Name :** Serendipity (Eat, Pray, Love)
- **Introduction :** When you clock out of your company and you're on your way home, a fellow co-worker/neighbor employee catches your eye. You think to yourself, "I wouldn't mind dating that person..."
Serendipity (Eat, Pray, Love) is a dating app for fellow employees designed to match you with employees within your vicinity who share similar interest!

## 2. Project

---

- **Before Starting:** 
This is the server-side file for our project, make sure to check out the client-side: https://github.com/codestates/Serendipity-client/tree/master

---

 ***Setup :***

- **Installing :**  Please install with:
```js
npm(yarn) install
``` 



- **Running the program :**
To run this server in your local setting, you will have to first create a Prisma account at: https://www.prismaio.com/

In the terminal, try to run:
```js
prisma init
```
You will most likely get an error message saying there might be a conflict with some files. The simplest way is to copy those files' contents, erase the file, and run 'prisma init' again. The files will re-emerge but empty. Paste the contents back into them.
Once done, please run:
```js
prisma deploy
prisma generate
```
This will create a service within your server and you can check out the database under the service tab.
You will also have to create a .env file in the project directory and add these variables with your own secrets:
```js
PORT = 4000
SENDGRID_USERNAME = ""
SENDGRID_PASSWORD = ""
JWT_SECRET = ""
AWS_KEY = ""
AWS_SECRET = ""
TWILIO_ACCOUNT_SID = ""
TWILIO_AUTH_TOKEN = ""
TWILIO_FROM_NUMBER = ""
ADMIN_EMAIL = ""

PRISMA_ENDPOINT = "" (Please enter the 'http endpoint' you can find in your Service tab of your prisma account.)
```
**Enter your email for ADMIN_EMAIL and enter the 'http endpoint' you can find in your Service tab of your prisma account.**


You can start the server with:
```js
npm(yarn) run dev
```

If testing on localhost (ex:4000), navigate to localhost:4000 to check out the playground page where you can test the resolver functions.



 ***Features :***
 Resolvers:
-adminDeleteAccount: Delete an account as an admin
-allUsers: Get data on all users
-checkUniqueID: Checks if the provided "name" field already exists
-confirmEmail: Checks if the provided email is a banned public email and checks if the email already exists, if the email passes both tests, send an email containing a secret phrase for verification and also return the secret phrase to the client for comparison.
-confirmText: Send a text message with a secret code to the provided phone number and also return the secret code to the client for comparison.
-createReport: Create a report with the provided data, unlikes the target user so he/she does not appear in the Match list again.
-deleteUser: Delete the requester's account.
-editUser: This is for when the user does not update their picture. Updates the user's information with the provided information.
-getHuntList: Returns a list of users that pass the filters of '5km geolocation vicinity', 'similar tag selection' and 'opposite biological gender'.
-getMe: Returns the requester's user data.
-getMessage: Retrieves from database all the messages in a chatroom.
-getRoom: Returns all the chatrooms(and the subsequent data within) that the user is participating in.
-getUser: Returns a requested user's data.
-likePlusRoom: Adds a target user to the requester's "like" list and creates a chatroom if they like each other.
-logOut: Sends a JWT token with 0 second life-time.
-roomDelete: Deletes a chatroom from the database.
-sendMessage: Creates a new message
-subscriptions: These are used to open a subscription channel
-unlike: Unlikes the target user and prevents him/her from appearing again on the Match list.

