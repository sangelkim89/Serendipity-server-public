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
  Query: {
    checkUniqueID: function () {
      var _checkUniqueID = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args) {
        var name, exists;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = args.name;
                _context.prev = 1;
                _context.next = 4;
                return _prismaClient.prisma.user({
                  name: name
                });

              case 4:
                exists = _context.sent;

                if (!exists) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", false);

              case 9:
                return _context.abrupt("return", true);

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 12]]);
      }));

      function checkUniqueID(_x, _x2) {
        return _checkUniqueID.apply(this, arguments);
      }

      return checkUniqueID;
    }()
  }
};
exports["default"] = _default;