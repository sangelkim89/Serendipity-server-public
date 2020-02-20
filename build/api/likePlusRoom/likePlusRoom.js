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
        var request, isAuthenticated, user, selectedId, exists, youLikeMe, mylikeBy, room;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request); //please

                user = request.user;
                selectedId = args.selectedId;
                _context.prev = 4;
                _context.next = 7;
                return _prismaClient.prisma.$exists.user({
                  myLikes_some: {
                    id: selectedId
                  }
                });

              case 7:
                exists = _context.sent;

                if (exists) {
                  _context.next = 13;
                  break;
                }

                _context.next = 11;
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

              case 11:
                _context.next = 15;
                break;

              case 13:
                if (!exists) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt("return", "you already like each other!");

              case 15:
                _context.next = 17;
                return _prismaClient.prisma.$exists.user({
                  AND: [{
                    id: selectedId
                  }, {
                    myLikes_some: {
                      id: user.id
                    }
                  }]
                });

              case 17:
                youLikeMe = _context.sent;
                _context.next = 20;
                return _prismaClient.prisma.$exists.user({
                  AND: [{
                    id: user.id
                  }, {
                    myLikes_some: {
                      id: selectedId
                    }
                  }]
                });

              case 20:
                mylikeBy = _context.sent;

                if (!(youLikeMe && mylikeBy)) {
                  _context.next = 28;
                  break;
                }

                _context.next = 24;
                return _prismaClient.prisma.createRoom({
                  participants: {
                    connect: [{
                      id: user.id
                    }, {
                      id: selectedId
                    }]
                  }
                });

              case 24:
                room = _context.sent;
                return _context.abrupt("return", "".concat(room.id));

              case 28:
                return _context.abrupt("return", "The request has been successfully processed.");

              case 29:
                _context.next = 34;
                break;

              case 31:
                _context.prev = 31;
                _context.t0 = _context["catch"](4);
                throw new Error("".concat(_context.t0));

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 31]]);
      }));

      function likeUser(_x, _x2, _x3) {
        return _likeUser.apply(this, arguments);
      }

      return likeUser;
    }()
  }
};
exports["default"] = _default;