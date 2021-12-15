const User = require("./models/User");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function authorization(passport) {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: (req) => {
          return req.cookies["jwt"];
        }, // we tell JWTStrategy where to find the token
        secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      },
      (jwtPayload, done) => {
        return (
          User.findById(jwtPayload.id)
            // performance improvement, not necessary
            .select("_id firstname lastname username email roles")
            .then((user) => {
              return done(null, user);
            })
            .catch((err) => {
              return done(err);
            })
        );
      }
    )
  );
}

module.exports = authorization;
