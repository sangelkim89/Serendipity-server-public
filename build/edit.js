"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editUserController = exports.editUserMiddleware = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

require("./env");

var _crypto = _interopRequireDefault(require("crypto"));

var _prismaClient = require("../generated/prisma-client");

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

var editUserMiddleware = upload.fields([{
  name: "profileImg"
}]);
exports.editUserMiddleware = editUserMiddleware;

var editUserController =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var profileImg, profileImgLocation, _req$body, password, companyName, companyRole, geoLocation, tags, bio, distance, email, parseTags, shasum, output;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            profileImg = req.files.profileImg;
            profileImgLocation = profileImg[0].location;
            _req$body = req.body, password = _req$body.password, companyName = _req$body.companyName, companyRole = _req$body.companyRole, geoLocation = _req$body.geoLocation, tags = _req$body.tags, bio = _req$body.bio, distance = _req$body.distance, email = _req$body.email; //parsisng Tags

            parseTags = JSON.parse(tags); // 해시로 password변환

            shasum = _crypto["default"].createHash("sha1");
            shasum.update(password);
            output = shasum.digest("hex");
            _context.prev = 7;

            if (!(password === "")) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return _prismaClient.prisma.updateUser({
              data: {
                companyName: companyName,
                companyRole: companyRole,
                geoLocation: geoLocation,
                tags: {
                  set: parseTags
                },
                profileImgLocation: profileImgLocation,
                bio: bio,
                distance: Number(distance)
              },
              where: {
                email: email
              }
            });

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return _prismaClient.prisma.updateUser({
              data: {
                password: output,
                companyName: companyName,
                companyRole: companyRole,
                geoLocation: geoLocation,
                tags: {
                  set: parseTags
                },
                profileImgLocation: profileImgLocation,
                bio: bio,
                distance: Number(distance)
              },
              where: {
                email: email
              }
            });

          case 15:
            res.status(200).json({
              profileImgLocation: profileImgLocation
            });
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            throw new Error("Can`t Edit User");

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 18]]);
  }));

  return function editUserController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.editUserController = editUserController;