import { prisma } from "../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../fragments";

export default {
  Query: {
    getHuntList: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      let { selfID } = request.user.id;
      let userGeoLocation = JSON.parse(request.user.geoLocation);
      // let userTags = JSON.parse(tags);
      let selfTags = request.user.tags;
      // console.log(selfTags);
      // console.log(selfTags);
      //tag는 stringify된 ["tag1","tag2","tag3"] 으로 옵니다

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
        const huntListByGeoLocation = await prisma
          .users({ where: { id_not: request.user.id } })
          .geoLocation();

        // console.log(huntListByTag);
        const filteredGeoLocations = huntListByGeoLocation.filter(user => {
          let parsed = JSON.parse(user.geoLocation);
          return (
            getDistance3(
              userGeoLocation[0],
              userGeoLocation[1],
              parsed[0],
              parsed[1]
            ) <= 5000
          );
        });
        let result = await Promise.all(
          filteredGeoLocations.map(async user => {
            let filteredUser = await prisma.users({
              where: { geoLocation: user.geoLocation }
            });
            let filtered = filteredUser.filter(user => {
              return user.tags.some(r => selfTags.indexOf(r) >= 0);
            });
            return filtered;
          })
        );
        return JSON.stringify(result.flat());
      } catch (error) {
        console.log(error);
      }
    }
  }
};
