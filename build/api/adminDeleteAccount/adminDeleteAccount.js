"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

require("../../env");

var _default = {
  Mutation: {
    adminDeleteAccount: function () {
      var _adminDeleteAccount = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                id = args.id;

                if (!(request.user.email === process.env.ADMIN_EMAIL)) {
                  _context.next = 16;
                  break;
                }

                _context.prev = 4;
                _context.next = 7;
                return _prismaClient.prisma.deleteUser({
                  id: id
                });

              case 7:
                return _context.abrupt("return", true);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 14:
                _context.next = 17;
                break;

              case 16:
                throw new Error("You are not authorized to do this.");

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      }));

      function adminDeleteAccount(_x, _x2, _x3) {
        return _adminDeleteAccount.apply(this, arguments);
      }

      return adminDeleteAccount;
    }()
  }
};
exports["default"] = _default;