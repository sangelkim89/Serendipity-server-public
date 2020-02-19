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
    unlike: function () {
      var _unlike = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, user, selectedId, likeUser;
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
                return _prismaClient.prisma.$exists.user({
                  AND: [{
                    id: user.id
                  }, {
                    myLikes_some: {
                      id: selectedId
                    }
                  }]
                });

              case 7:
                likeUser = _context.sent;

                if (!likeUser) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return _prismaClient.prisma.updateUser({
                  where: {
                    id: user.id
                  },
                  data: {
                    // 해당 유저와 disconnect시키기
                    myLikes: {
                      disconnect: {
                        id: selectedId
                      }
                    },
                    //해당 유저  Unlikes추가
                    myUnlikes: {
                      connect: {
                        id: selectedId
                      }
                    }
                  }
                });

              case 11:
                return _context.abrupt("return", true);

              case 14:
                _context.next = 16;
                return _prismaClient.prisma.updateUser({
                  where: {
                    id: user.id
                  },
                  data: {
                    myUnlikes: {
                      connect: {
                        id: selectedId
                      }
                    }
                  }
                });

              case 16:
                return _context.abrupt("return", true);

              case 17:
                _context.next = 23;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 19]]);
      }));

      function unlike(_x, _x2, _x3) {
        return _unlike.apply(this, arguments);
      }

      return unlike;
    }()
  }
};
exports["default"] = _default;