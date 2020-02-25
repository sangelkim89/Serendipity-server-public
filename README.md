## 1. Intro

- **팀 명 :** Serengeti
- **프로젝트 명 :** Serendipity (Eat, Pray, Love)

## 2. Project

---

회사 출퇴근 하면서 '저 사람 되게 괜찮아 보인다. 한 번 만나보고 싶다'는 생각을 가지고 있었는데

직장인들을 위한 만남 주선 어플을 만들어보면 어떨까 하는 생각으로 만든 프로젝트입니다.



- Stack :  Server: GraphQL, 
             ORM: Prisma, 
             Auth: Passport-jwt+Crypto, 
             DB: PostgreSQL, 
             Server+DB Deploy: Heroku, 
             APK: Expo, 
             Image Storage: multer + s3,
             Text: twilio,
             Email: nodemailer
- Works : getUser, getMe, signUp, logOut, confirmText, checkForBannedEmail, submitReport, getHuntList, nicknameCheck, deleteAccount, deploy
    1. getUser: client sends a user's id with which the server searches the database and returns its user data
    2. getMe: client sends the logged-in user's id with which the server searches the database and returns its user data
    3. signUp: the client sends sign-up data with which the server creates an account into the database. Using multer, the user's profile image is stored in AWS S3
    4. logOut: client sends the logged-in user's id with which the server returns a jwt token with 0 second lifespan.
    5. confirmText: client sends a phone number with which the server uses Twilio to send a confirmation text message containing the verification code.
    6. checkForBannedEmail: client sends an email with which the server checks if the email is considered "public." Banned emails are listed in a separate file and exported to the resolver function.
    7. submitReport: client sends the target id with which the server creates a report about the reportee in the database. To prevent the re-match of these two users, the server also places the reportee in a "disliked" category of the reporter. Once included in this category, a future match is impossible.
    8. getHuntList: client sends the logged-in user's data with which the server finds a list of matches from the database. The list is filtered by: 
    1) The geo-location distance between the two users (both need to be within 5km of each other). This is done by calculations with their lat/long coordinates.
    2) At least one of their selected "interest" tags must match.
    3) Must be opposite biological genders.
    4) Must not be already disliked by the other person.
    9. nicknameCheck: client sends the user's selected nickname with which the server checks the database to see if is already chosen. Returns a boolean value.
    10. deleteAccount: client sends the logged-in user's id with which the server deletes the user from the database.
    11. deploy: Deployed server+PostgreSQL using Heroku and created the client's APK using Expo.


## 3. set up : $npm install
               $prisma deploy
               $prisma generate





