"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _fragments = require("../../fragments");

var _default = {
  Subscription: {
    newRoom: {
      subscribe: function subscribe(_, args) {
        var id = args.id;
        return _prismaClient.prisma.$subscribe.room({
          AND: [{
            mutation_in: "CREATED"
          }, {
            node: {
              participants_some: {
                id: id
              }
            }
          }]
        }).node().$fragment(_fragments.ROOM_FRAGMENT);
      },
      resolve: function resolve(payload) {
        return payload;
      }
    }
  }
};
exports["default"] = _default;