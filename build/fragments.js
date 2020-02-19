"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MESSAGES_FRAGMENT = exports.ROOM_FRAGMENT = exports.MESSAGE_FRAGMENT = exports.USER_FRAGMENT = void 0;
var USER_FRAGMENT = "\n    id\n   name\n   email  \n  phone\n  birth\n  companyName\n  companyRole\n  geoLocation\n  tags\n  profileImgLocation\n  bio\n  distance\n\n\n\n";
exports.USER_FRAGMENT = USER_FRAGMENT;
var MESSAGE_FRAGMENT = "\nid\ntext\nto{\n    ".concat(USER_FRAGMENT, "\n}\nfrom{\n    ").concat(USER_FRAGMENT, "\n}\ncreatedAt\n");
exports.MESSAGE_FRAGMENT = MESSAGE_FRAGMENT;
var ROOM_FRAGMENT = "\nfragment RoomParts on Room{\nid\ncreatedAt\nparticipants{\n   \n    ".concat(USER_FRAGMENT, "\n}\nmessages{\n    ").concat(MESSAGE_FRAGMENT, "\n}\n}\n");
exports.ROOM_FRAGMENT = ROOM_FRAGMENT;
var MESSAGES_FRAGMENT = "\nfragment MessageParts on Message{\nid\ntext\n\nto{\n    ".concat(USER_FRAGMENT, "\n}\nfrom{\n    ").concat(USER_FRAGMENT, "\n}\nroom{\n    id\n}\ncreatedAt\n}\n");
exports.MESSAGES_FRAGMENT = MESSAGES_FRAGMENT;