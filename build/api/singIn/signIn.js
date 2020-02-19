"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

var _utils = require("../../utils");

var _crypto = _interopRequireDefault(require("crypto"));

var _default = {
  Mutation: {
    signIn: function () {
      var _signIn = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args) {
        var email, password, shasum, output, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = args.email, password = args.password; // 해시 생성

                shasum = _crypto["default"].createHash("sha1");
                shasum.update(password);
                output = shasum.digest("hex"); //저장된 유저 정보 가져오기

                _context.next = 6;
                return _prismaClient.prisma.user({
                  email: email
                });

              case 6:
                user = _context.sent;

                if (!(user.password === output)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", JSON.stringify({
                  token: (0, _utils.generateToken)(user.id),
                  id: user.id
                }));

              case 11:
                throw new Error("Can`t sign in");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signIn(_x, _x2) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }
};
exports["default"] = _default;