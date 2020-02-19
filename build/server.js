"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./env");

var _graphqlYoga = require("graphql-yoga");

var _schema = _interopRequireDefault(require("./schema"));

var _morgan = _interopRequireDefault(require("morgan"));

var _middleware = require("./middleware");

var _passport = require("./passport");

var _upload = require("./upload");

var _edit = require("./edit");

var PORT = process.env.PORT || 4000;
var server = new _graphqlYoga.GraphQLServer({
  schema: _schema["default"],
  context: function context(_ref) {
    var request = _ref.request;
    return {
      request: request,
      isAuthenticated: _middleware.isAuthenticated
    };
  }
}); //req.request 객체를 grapql server에서 사용할 수 있게 도와준다.

server.express.use((0, _morgan["default"])("dev"));
server.express.use(_passport.authenticateJwt);
server.express.post("/api/img", _edit.editUserMiddleware, _edit.editUserController); //img포함 유저 edit 수정;;

server.express.post("/api/upload", _upload.uploadMiddleware, _upload.uploadController); //회원가입 및 사진 S3 에 저장;;

server.start({
  port: PORT
}, function () {
  return console.log("Server running on  http://localhost:".concat(PORT));
});