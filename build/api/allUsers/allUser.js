"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Query: {
    allUsers: function allUsers() {
      return _prismaClient.prisma.users();
    }
  }
};
exports["default"] = _default;