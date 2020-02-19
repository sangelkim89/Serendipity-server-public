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
  Mutation: {
    getRoom: function () {
      var _getRoom = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, id, room;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                id = args.id;
                console.log("id: ", id);
                _context.prev = 4;
                _context.next = 7;
                return _prismaClient.prisma.rooms({
                  where: {
                    participants_some: {
                      id: id
                    }
                  }
                }).$fragment(_fragments.ROOM_FRAGMENT);

              case 7:
                room = _context.sent;
                return _context.abrupt("return", room);

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11]]);
      }));

      function getRoom(_x, _x2, _x3) {
        return _getRoom.apply(this, arguments);
      }

      return getRoom;
    }()
  }
};
exports["default"] = _default;