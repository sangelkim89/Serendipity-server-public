"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _utils = require("../../utils");

var _default = {
  Mutation: {
    logOut: function () {
      var _logOut = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, __, _ref) {
        var request, isAuthenticated, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                user = request.user;
                return _context.abrupt("return", (0, _utils.signOutToken)(user.id));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function logOut(_x, _x2, _x3) {
        return _logOut.apply(this, arguments);
      }

      return logOut;
    }()
  }
};
exports["default"] = _default;