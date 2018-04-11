'use strict'

const app = require('../../api')
const passport = require("passport")
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

class PassportService {

  /**
   * Initialize Passport JWT strategy
   */
  initializePassport() {

    let jwtOptions = {}

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = 'secret';
    const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

      app.model.User.find({ where: {id: jwt_payload.id}, raw: true })
        .then(user=> {
          if (user) {
            next(null, user);
          } else {
            next(null, false);
          }
        })
    });

    passport.use(strategy);
  }
}

module.exports = new PassportService()
