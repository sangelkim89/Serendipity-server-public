"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _fragments = require("../../fragments");

var _default = {
  Subscription: {
    newMessage: {
      subscribe: function subscribe(_, args) {
        var roomId = args.roomId;
        return _prismaClient.prisma.$subscribe.message({
          AND: [{
            mutation_in: "CREATED"
          }, {
            node: {
              room: {
                id: roomId
              }
            }
          }]
        }).node().$fragment(_fragments.MESSAGES_FRAGMENT);
      },
      resolve: function resolve(payload) {
        return payload;
      }
    }
  }
};
exports["default"] = _default;