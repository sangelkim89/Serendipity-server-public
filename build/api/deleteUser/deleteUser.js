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
    deleteUser: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, __, _ref) {
        var request, isAuthenticated, id;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                //자기자신이 회원탈퇴
                isAuthenticated(request);
                id = request.user.id;
                _context.prev = 3;
                _context.next = 6;
                return _prismaClient.prisma.deleteUser({
                  id: id
                });

              case 6:
                return _context.abrupt("return", true);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", false);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 9]]);
      }));

      function deleteUser(_x, _x2, _x3) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }
};
exports["default"] = _default;