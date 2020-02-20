"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadController = exports.uploadMiddleware = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

require("./env");

var _prismaClient = require("../generated/prisma-client");

var _crypto = _interopRequireDefault(require("crypto"));

/////////////////// multer로 img 업로드 /////////////////
var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2"
});
var upload = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: "public-read",
    bucket: "serendipity-uploads",
    metadata: function metadata(req, file, cb) {
      cb(null, {
        fieldName: file.fieldname
      });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
}); ////formData로 받을때 file로 받고  img가 아닌 Data는 body로 넘어온다.//////
////////////////////////upload.single는 한가지 req.file|||||||fields 는 여러개req.files

var uploadMiddleware = upload.fields([{
  name: "profileImg"
}]);
exports.uploadMiddleware = uploadMiddleware;

var uploadController =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var profileImg, profileImgLocation, _req$body, name, phone, password, email, gender, birth, bio, companyName, companyRole, geoLocation, tags, distance, parsedgeoLocation, shasum, output, parseTags;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            profileImg = req.files.profileImg;
            profileImgLocation = profileImg[0].location;
            _req$body = req.body, name = _req$body.name, phone = _req$body.phone, password = _req$body.password, email = _req$body.email, gender = _req$body.gender, birth = _req$body.birth, bio = _req$body.bio, companyName = _req$body.companyName, companyRole = _req$body.companyRole, geoLocation = _req$body.geoLocation, tags = _req$body.tags, distance = _req$body.distance; //name(닉네임)중복확인

            console.log("geoLocation: ", geoLocation);
            console.log("typeof geoLocation: ", (0, _typeof2["default"])(geoLocation));
            console.log("geoLocation[0]: ", geoLocation[0]);
            parsedgeoLocation = JSON.parse(geoLocation);
            console.log("parsedgeoLocation[0]: ", parsedgeoLocation[0]);
            _context.prev = 8;
            // 해시로 password변환
            shasum = _crypto["default"].createHash("sha1");
            shasum.update(password);
            output = shasum.digest("hex"); ////singUp요청////

            parseTags = JSON.parse(tags);
            _context.next = 15;
            return _prismaClient.prisma.createUser({
              name: name,
              phone: phone,
              password: output,
              email: email,
              gender: gender,
              birth: birth,
              bio: bio,
              companyName: companyName,
              companyRole: companyRole,
              geoLocation: geoLocation,
              profileImgLocation: profileImgLocation,
              tags: {
                set: parseTags
              },
              distance: distance
            });

          case 15:
            res.status(200).json({
              profileImgLocation: profileImgLocation
            });
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](8);
            console.log(_context.t0);
            throw new Error("Can`t Create Account");

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 18]]);
  }));

  return function uploadController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.uploadController = uploadController;