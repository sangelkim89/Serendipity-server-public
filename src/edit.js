import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import "./env";
import { prisma } from "../generated/prisma-client";
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
export const editUserMiddleware = upload.fields([{ name: "profileImg" }, { name: "cardImg" }]);

export const editUserController = async (req, res) => {
  const { cardImg, profileImg } = req.files;

  const cardImgLocation = cardImg[0].location;
  const profileImgLocation = profileImg[0].location;

  const {
    gender,
    email,
    password,
    phone,
    name,
    birth,
    companyName,
    companyRole,
    geoLocation,
    tags,
    bio
  } = req.body;

  try {
    const parseTags = JSON.parse(tags);
    await prisma.updateUser({
      data: {
        gender,
        email,
        password,
        phone,
        name,
        birth,
        companyName,
        companyRole,
        geoLocation,
        tags: { set: parseTags },
        profileImgLocation,
        cardImgLocation,
        bio
      },
      where: {
        email
      }
    });

    res.status(200).json({
      cardImgLocation,
      profileImgLocation
    });
  } catch (error) {
    throw new Error("Can`t Edit User");
  }
};
