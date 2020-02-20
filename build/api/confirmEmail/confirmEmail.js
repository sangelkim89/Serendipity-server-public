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

var _email = require("../../email");

var _default = {
  Mutation: {
    confirmEmail: function () {
      var _confirmEmail = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args) {
        var email, loginSecret, exists, i, splitEmail;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = args.email;
                loginSecret = (0, _utils.generateSecret)();
                _context.next = 4;
                return _prismaClient.prisma.user({
                  email: email
                });

              case 4:
                exists = _context.sent;
                i = 0;

              case 6:
                if (!(i < _email.forbiddenEmails.length)) {
                  _context.next = 13;
                  break;
                }

                splitEmail = email.split("@");

                if (!(_email.forbiddenEmails[i] === splitEmail[1])) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", "forbiddenEmail");

              case 10:
                i++;
                _context.next = 6;
                break;

              case 13:
                if (!exists) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", "Email already exists!");

              case 17:
                if (exists) {
                  _context.next = 27;
                  break;
                }

                _context.prev = 18;
                _context.next = 21;
                return (0, _utils.sendSecretMail)(email, loginSecret);

              case 21:
                return _context.abrupt("return", loginSecret);

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](18);
                throw Error("Failed to send email");

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[18, 24]]);
      }));

      function confirmEmail(_x, _x2) {
        return _confirmEmail.apply(this, arguments);
      }

      return confirmEmail;
    }()
  }
};
exports["default"] = _default;