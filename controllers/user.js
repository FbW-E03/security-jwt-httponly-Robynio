const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  try {
    const checkPassword = await bcrypt.compare(req.body.password, user.hash);
    console.log(checkPassword);
    if (checkPassword) {
      const token = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      // const token = await issueJwt.generateToken(user);

      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({ message: "login a success", token });
    }
    // if(!checkPassword){
    // return res.status(400).json({message: "Password does not match any found it system. Please try again."})
    // }
  } catch (error) {
    console.log("the error is", error);
    return res.status(400).json({ message: "This user was not found", error });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "username firstname lastname email"
    );
    res.status(200).send({ message: "user info", user });
  } catch (err) {
    res.status(404).send({ err: "not there" });
  }
};

exports.register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  const olderUser = await User.findOne({ username });
  olderUser ? res.status(409).send("this user already exists") : "";
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await User.create({
    username,
    firstname,
    lastname,
    email,
    hash: hashedPassword,
  });

  const token = jwt.sign({ id: data._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
  return res
    .status(200)
    .cookie("jwt", token, { httpOnly: true, secure: false, sameSite: "lax" })
    .send({ message: "new user has been created ", data, token });
};
