import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import "./env";
import { prisma } from "../generated/prisma-client";
import crypto from "crypto";
import { forbiddenEmails } from "./email";
/////////////////// multer로 img 업로드 /////////////////
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});
const upload = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "serendipity-uploads",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
////formData로 받을때 file로 받고  img가 아닌 Data는 body로 넘어온다.//////
////////////////////////upload.single는 한가지 req.file|||||||fields 는 여러개req.files
export const uploadMiddleware = upload.fields([{ name: "profileImg" }, { name: "cardImg" }]);

export const uploadController = async (req, res) => {
  const { cardImg, profileImg } = req.files;
  console.log(req);
  const cardImgLocation = cardImg[0].location;
  const profileImgLocation = profileImg[0].location;

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
    geoLocation,
    tags
  } = req.body;
  //name(닉네임)중복확인
  console.log("geoLocation: ", geoLocation);
  console.log("typeof geoLocation: ", typeof geoLocation);
  console.log("geoLocation[0]: ", geoLocation[0]);
  const parsedgeoLocation = JSON.parse(geoLocation);
  console.log("parsedgeoLocation[0]: ", parsedgeoLocation[0]);
  try {
    // 해시로 password변환
    const shasum = crypto.createHash("sha1");
    shasum.update(password);
    const output = shasum.digest("hex");

    ////singUp요청////
    const parseTags = JSON.parse(tags);
    await prisma.createUser({
      name,
      phone,
      password: output,
      email,
      gender,
      birth,
      bio,
      companyName,
      companyRole,
      geoLocation,
      cardImgLocation,
      profileImgLocation,
      tags: { set: parseTags }
    });

    res.status(200).json({
      cardImgLocation,
      profileImgLocation
    });
  } catch (error) {
    console.log(error);
    throw new Error("Can`t Create Account");
  }
};

///////tag &&  user 연결 및 생성//////
// const parseTags = JSON.parse(tags);
// for (let i = 0; i < parseTags.length; i++) {
//   await prisma.createTag({
//     user: {
//       connect: {
//         email: email
//       }
//     },
//     tag: parseTags[i]
//   });
// }
