"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = void 0;

var isAuthenticated = function isAuthenticated(request) {
  //   console.log("request.headers in isAuth : ", request.headers);
  if (!request.user) {
    throw Error("You need to log....");
  }

  return;
};

exports.isAuthenticated = isAuthenticated;