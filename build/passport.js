"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateJwt = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _prismaClient = require("../generated/prisma-client");

require("./env");

var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  //Authorization Bearer에서 jwt 토큰를 찾는 역할;;
  secretOrKey: process.env.JWT_SECRET
}; //payload로 넘겨받은 정보를 이용해 db에서 해당 유저 정보를 가져온다.
//user가있으면 done으로 넘겨준다.

var verifyUser =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(payload, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _prismaClient.prisma.user({
              id: payload.id
            });

          case 3:
            user = _context.sent;

            if (!(user !== null)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", done(null, user));

          case 8:
            return _context.abrupt("return", done(null, false));

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", done(_context.t0, false));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function verifyUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //전달 받은 user를 request 객체에 user정보를 붙여준다.


var authenticateJwt = function authenticateJwt(req, res, next) {
  _passport["default"].authenticate("jwt", {
    session: false
  }, function (error, user) {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
};

exports.authenticateJwt = authenticateJwt;

_passport["default"].use(new _passportJwt.Strategy(jwtOptions, verifyUser)); //토큰을해석해서 callback함수인 verifyUser에게 넘겨준다.
// ..strategy을 사용하면 그 strategy 가 모든 작업을 한 후에 결과물을 payload에 전달을 해준다.


_passport["default"].initialize(); // passport는 인증 관련한모든일을한다.
// jwt토큰이나 쿠키에서 정보를 가져와서 사용자 정보에 저장한다.
// 토큰에서 정보를 가져와서 request에 붙여준다
// 토큰을 가져와서 해독한후에 사용자 객체를 request에 추가해준다.
// passport을 이용해 자동으로 해줄수도 있고, 이러한 작업을 수동으로 해줄 수도 있다.
//전체적인 flow
//토큰을 받아서 해석하고,사용자를 찾고 사용자가 존재한다면 req객체에 사용자를 추가하고 나면
// graphql를 실행;;;