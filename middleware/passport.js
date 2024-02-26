const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
const logger = require("../logger");

require("dotenv").config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies("jwt");
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretKey: process.env.SECRET_JWT,
};

function passportFunction(passport) {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.name, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          logger.info("Token OK");
          return done(null, user);
        } else {
          logger.info("Token NOT OK");
          return done(null, false);
        }
      });
    })
  );
}

module.exports = passportFunction;
