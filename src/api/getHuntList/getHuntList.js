import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    getHuntList: async (_, __, { request, isAuthenticated }) => {
      // console.log("인증 : ", request);
      isAuthenticated(request);
      const {
        user: { tags: selfTags, distance }
      } = request;

      let userGeoLocation = request.user.geoLocation;
      userGeoLocation = JSON.parse(userGeoLocation);

      let getDistance3 = function(lat1, lon1, lat2, lon2) {
        var R = 6371e3; // metres
        var φ1 = Math.sin((lat1 * Math.PI) / 180);
        var φ2 = Math.sin((lat2 * Math.PI) / 180);
        var Δφ = Math.sin(((lat2 - lat1) * Math.PI) / 180);
        var Δλ = Math.sin(((lon2 - lon1) * Math.PI) / 180);

        var a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;
        return d;
      };

      try {
        //like 필터링
        const huntListByGeoLocation = await prisma.users({
          where: {
            AND: [
              { id_not: request.user.id },
              { gender_not: request.user.gender },
              { unlikedBy_none: { id: request.user.id } },
              { myUnlikes_none: { id: request.user.id } }
            ]
          }
        });
        // console.log("like", huntListByGeoLocation);
        ///거리 필터링
        const filteredGeoLocations = huntListByGeoLocation.filter(user => {
          let parsed = user.geoLocation;
          parsed = JSON.parse(parsed);

          return (
            getDistance3(userGeoLocation.lat, userGeoLocation.lon, parsed.lat, parsed.lon) <=
            Number(distance + "000")
          );
        });
        // console.log("distance", filteredGeoLocations);
        ///tag 필터링
        const result = filteredGeoLocations.filter(user => {
          return user.tags.some(tag => selfTags.indexOf(tag) >= 0);
        });
        // console.log("result", result);
        return JSON.stringify(result);
      } catch (error) {
        throw new Error(`${error}`);
      }
    }
  }
};
