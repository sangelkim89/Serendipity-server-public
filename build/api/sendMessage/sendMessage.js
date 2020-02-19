"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

// import { ROOM_FRAGMENT } from "../../fragments";
var _default = {
  Mutation: {
    sendMessage: function () {
      var _sendMessage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, user, roomId, message, toId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                user = request.user;
                roomId = args.roomId, message = args.message, toId = args.toId;
                return _context.abrupt("return", _prismaClient.prisma.createMessage({
                  text: message,
                  from: {
                    connect: {
                      id: user.id
                    }
                  },
                  to: {
                    connect: {
                      id: toId
                    }
                  },
                  room: {
                    connect: {
                      id: roomId
                    }
                  }
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sendMessage(_x, _x2, _x3) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }
};
exports["default"] = _default;