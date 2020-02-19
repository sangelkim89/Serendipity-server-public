"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOutToken = exports.generateToken = exports.sendSecretMail = exports.generateSecret = void 0;

var _words = require("./words");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerSendgridTransport = _interopRequireDefault(require("nodemailer-sendgrid-transport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

require("./env");

var generateSecret = function generateSecret() {
  var randomNumber = Math.floor(Math.random() * _words.adjectives.length);
  return "".concat(_words.adjectives[randomNumber], " ").concat(_words.nouns[randomNumber]);
};

exports.generateSecret = generateSecret;

var sendMail = function sendMail(email) {
  var options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  var client = _nodemailer["default"].createTransport((0, _nodemailerSendgridTransport["default"])(options));

  return client.sendMail(email);
};

var sendSecretMail = function sendSecretMail(adress, secret) {
  var email = {
    from: "Serendipity@Serengeti.com",
    to: adress,
    subject: "Login Secret for Serendipity",
    html: "Hello! your login secret is<strong> ".concat(secret, "</strong>.<br/>Copy paste on the app to log in")
  };
  return sendMail(email);
};

exports.sendSecretMail = sendSecretMail;

var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: 1000000
  });
};

exports.generateToken = generateToken;

var signOutToken = function signOutToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: 0
  });
};

exports.signOutToken = signOutToken;