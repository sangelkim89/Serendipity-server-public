"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

var _crypto = _interopRequireDefault(require("crypto"));

var _default = {
  Mutation: {
    editUser: function () {
      var _editUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, companyName, companyRole, bio, password, geoLocation, tags, distance, shasum, output, parseTags;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                companyName = args.companyName, companyRole = args.companyRole, bio = args.bio, password = args.password, geoLocation = args.geoLocation, tags = args.tags, distance = args.distance; // 해시 생성

                shasum = _crypto["default"].createHash("sha1");
                shasum.update(password);
                output = shasum.digest("hex");
                parseTags = JSON.parse(tags);
                _context.prev = 7;

                if (!(password === "")) {
                  _context.next = 13;
                  break;
                }

                _context.next = 11;
                return _prismaClient.prisma.updateUser({
                  data: {
                    geoLocation: geoLocation,
                    companyName: companyName,
                    companyRole: companyRole,
                    bio: bio,
                    distance: distance,
                    tags: {
                      set: parseTags
                    }
                  },
                  where: {
                    id: request.user.id
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
                    geoLocation: geoLocation,
                    companyName: companyName,
                    companyRole: companyRole,
                    bio: bio,
                    distance: distance,
                    tags: {
                      set: parseTags
                    }
                  },
                  where: {
                    id: request.user.id
                  }
                });

              case 15:
                return _context.abrupt("return", true);

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](7);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[7, 18]]);
      }));

      function editUser(_x, _x2, _x3) {
        return _editUser.apply(this, arguments);
      }

      return editUser;
    }()
  }
};
exports["default"] = _default;