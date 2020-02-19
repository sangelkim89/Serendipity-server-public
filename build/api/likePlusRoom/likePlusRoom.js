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
    likeUser: function () {
      var _likeUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, user, selectedId, youLikeMe, mylikeBy, room;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                user = request.user;
                selectedId = args.selectedId;
                _context.prev = 4;
                _context.next = 7;
                return _prismaClient.prisma.updateUser({
                  where: {
                    id: user.id
                  },
                  data: {
                    myLikes: {
                      connect: {
                        id: selectedId
                      }
                    }
                  }
                });

              case 7:
                _context.next = 9;
                return _prismaClient.prisma.$exists.user({
                  AND: [{
                    id: selectedId
                  }, {
                    myLikes_some: {
                      id: user.id
                    }
                  }]
                });

              case 9:
                youLikeMe = _context.sent;
                _context.next = 12;
                return _prismaClient.prisma.$exists.user({
                  AND: [{
                    id: user.id
                  }, {
                    myLikes_some: {
                      id: selectedId
                    }
                  }]
                });

              case 12:
                mylikeBy = _context.sent;

                if (!(youLikeMe && mylikeBy)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 16;
                return _prismaClient.prisma.createRoom({
                  participants: {
                    connect: [{
                      id: user.id
                    }, {
                      id: selectedId
                    }]
                  }
                });

              case 16:
                room = _context.sent;
                return _context.abrupt("return", "".concat(room.id));

              case 20:
                return _context.abrupt("return", "The request has been successfully processed.");

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](4);
                throw new Error("".concat(_context.t0));

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 23]]);
      }));

      function likeUser(_x, _x2, _x3) {
        return _likeUser.apply(this, arguments);
      }

      return likeUser;
    }()
  }
};
exports["default"] = _default;