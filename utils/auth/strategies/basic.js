const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const MongoLib = require("../../../lib/mongo");

passport.use(
  new BasicStrategy(async (username, password, callback) => {
    const mongoDb = new MongoLib();
    try {
      const [user] = await mongoDb.getAll("users", { username });
      if (!user) {
        return callback(boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return callback(boom.unauthorized(), false);
      }
      return callback(null, user);
    } catch (error) {
      return callback(error);
    }
  })
);
