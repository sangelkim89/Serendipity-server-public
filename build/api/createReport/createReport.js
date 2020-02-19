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
    createReport: function () {
      var _createReport = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, userId, text, optionText, toId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                userId = request.user.id;
                text = args.text, optionText = args.optionText, toId = args.toId;
                _context.prev = 4;
                _context.next = 7;
                return _prismaClient.prisma.updateUser({
                  where: {
                    id: userId
                  },
                  data: {
                    myLikes: {
                      disconnect: {
                        id: toId
                      }
                    },
                    myUnlikes: {
                      connect: {
                        id: toId
                      }
                    }
                  }
                });

              case 7:
                _context.next = 9;
                return _prismaClient.prisma.createReportMessage({
                  text: text,
                  optionText: optionText,
                  to: {
                    connect: {
                      id: toId
                    }
                  },
                  from: {
                    connect: {
                      id: userId
                    }
                  }
                });

              case 9:
                return _context.abrupt("return", true);

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 12]]);
      }));

      function createReport(_x, _x2, _x3) {
        return _createReport.apply(this, arguments);
      }

      return createReport;
    }()
  }
};
exports["default"] = _default;