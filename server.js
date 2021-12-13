const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

dotenv.config();

const path = require("path");
const app = express();

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;
const clientUrl = `http://localhost:${PORT}`;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => console.log(`Connected to the database!`))
  .catch((err) => console.log(`Error occurred! ${err}`));

app.use("/user", userRoute);

// !! Your middleware should not go below this line !!
// Serve frontend client/build folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`The server 🙈 is listening on port ${PORT}`);
  console.log(`Visit ${clientUrl} in your browser`);
});
