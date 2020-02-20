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
    getHuntList: function () {
      var _getHuntList = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_, __, _ref) {
        var request, isAuthenticated, _request$user, selfTags, distance, userGeoLocation, getDistance3, huntListByGeoLocation, filteredGeoLocations, result;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                console.log("request.user : ", request.user);
                isAuthenticated(request);
                _request$user = request.user, selfTags = _request$user.tags, distance = _request$user.distance;
                userGeoLocation = request.user.geoLocation;
                userGeoLocation = JSON.parse(userGeoLocation);
                console.log("usergeolocation", userGeoLocation);
                console.log("usergeolocation.lat: ", userGeoLocation.lat);

                getDistance3 = function getDistance3(lat1, lon1, lat2, lon2) {
                  var R = 6371e3; // metres

                  var φ1 = Math.sin(lat1 * Math.PI / 180);
                  var φ2 = Math.sin(lat2 * Math.PI / 180);
                  var Δφ = Math.sin((lat2 - lat1) * Math.PI / 180);
                  var Δλ = Math.sin((lon2 - lon1) * Math.PI / 180);
                  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  var d = R * c;
                  return d;
                };

                _context.prev = 9;
                _context.next = 12;
                return _prismaClient.prisma.users({
                  where: {
                    AND: [{
                      id_not: request.user.id
                    }, {
                      gender_not: request.user.gender
                    }, {
                      unlikedBy_none: {
                        id: request.user.id
                      }
                    }, {
                      myUnlikes_none: {
                        id: request.user.id
                      }
                    }]
                  }
                });

              case 12:
                huntListByGeoLocation = _context.sent;
                console.log("huntListByLocation: ", huntListByGeoLocation); ///거리 필터링

                filteredGeoLocations = huntListByGeoLocation.filter(function (user) {
                  var parsed = user.geoLocation;
                  parsed = JSON.parse(parsed);
                  console.log("parsed", parsed);
                  console.log("parsed.lat: ", parsed.lat);
                  return getDistance3(userGeoLocation.lat, userGeoLocation.lon, parsed.lat, parsed.lon) <= Number(distance + "000");
                });
                console.log("filteredGeoLocation: ", filteredGeoLocations); ///tag 필터링

                result = filteredGeoLocations.filter(function (user) {
                  return user.tags.some(function (tag) {
                    return selfTags.indexOf(tag) >= 0;
                  });
                });
                console.log("result: ", result);
                return _context.abrupt("return", JSON.stringify(result));

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](9);
                throw new Error("".concat(_context.t0));

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[9, 21]]);
      }));

      function getHuntList(_x, _x2, _x3) {
        return _getHuntList.apply(this, arguments);
      }

      return getHuntList;
    }()
  }
};
exports["default"] = _default;