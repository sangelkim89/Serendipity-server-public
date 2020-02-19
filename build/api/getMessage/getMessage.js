"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

var _fragments = require("../../fragments");

var _default = {
  Query: {
    getMessage: function () {
      var _getMessage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, id, message;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                id = args.id;
                _context.prev = 3;
                _context.next = 6;
                return _prismaClient.prisma.messages({
                  where: {
                    room: {
                      participants_some: {
                        id: id
                      }
                    }
                  }
                }).$fragment(_fragments.MESSAGES_FRAGMENT);

              case 6:
                message = _context.sent;
                return _context.abrupt("return", message);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 10]]);
      }));

      function getMessage(_x, _x2, _x3) {
        return _getMessage.apply(this, arguments);
      }

      return getMessage;
    }()
  }
};
exports["default"] = _default;