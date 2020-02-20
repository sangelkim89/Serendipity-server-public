"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Mutation: {
    getMe: function () {
      var _getMe = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, user, userProfile;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                user = request.user;
                _context.next = 5;
                return _prismaClient.prisma.user({
                  id: user.id
                });

              case 5:
                userProfile = _context.sent;
                return _context.abrupt("return", userProfile);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getMe(_x, _x2, _x3) {
        return _getMe.apply(this, arguments);
      }

      return getMe;
    }()
  }
};
exports["default"] = _default;