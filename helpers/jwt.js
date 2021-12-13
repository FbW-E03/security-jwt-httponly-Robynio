const jsonwebtoken = require("jsonwebtoken");
const { Promise } = require("mongoose");

exports.issueJwt = (user) => {
  const payload = {
    id: user._id,
  };

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(
      payload,
      process.env["SECRET"],
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          reject();
        }
        resolve(token);
      }
    );
  });
};
