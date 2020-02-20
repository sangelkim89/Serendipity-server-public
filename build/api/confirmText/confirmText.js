"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("../../env");

var _default = {
  Mutation: {
    confirmText: function () {
      var _confirmText = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, args) {
        var phone, newPhone, accountSID, authToken, textSecretNumber, secretString, client;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                phone = args.phone;
                newPhone = phone;
                newPhone = newPhone.slice(1);
                newPhone = '+01182' + newPhone;
                accountSID = process.env.TWILIO_ACCOUNT_SID;
                authToken = process.env.TWILIO_AUTH_TOKEN;
                textSecretNumber = Math.floor(Math.random() * 99999) + 11111;
                secretString = textSecretNumber.toString();
                client = require('twilio')(accountSID, authToken);
                _context.prev = 9;
                _context.next = 12;
                return client.messages.create({
                  to: newPhone,
                  from: process.env.TWILIO_FROM_NUMBER,
                  body: "Hello! Your secret code is: ".concat(secretString, ". Copy paste this on the app to verify")
                });

              case 12:
                return _context.abrupt("return", secretString);

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](9);
                console.log(_context.t0);
                throw Error('Failed to send secret character.');

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[9, 15]]);
      }));

      function confirmText(_x, _x2) {
        return _confirmText.apply(this, arguments);
      }

      return confirmText;
    }()
  }
};
exports["default"] = _default;