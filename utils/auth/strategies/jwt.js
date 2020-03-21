const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");

const config = require("../../../config");
const MongoLib = require("../../../lib/mongo");

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (tokenPayLoad, callback) => {
      const mongoDb = new MongoLib();
      try {
        const [user] = await mongoDb.getAll("users", {
          username: tokenPayLoad.sub
        });
        if (!user) {
          return callback(boom.unauthorized(), false);
        }
        return callback(null, user);
      } catch (error) {
        return callback(error);
      }
    }
  )
);
