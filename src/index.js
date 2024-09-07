const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "abhayloveskiara"
const app = express();

app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "you have signed up, recently",
  });
  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  //check the user exist in the local storage
  const user = users.find(function (u) {
    if (u.username == username && u.password == password) {
      return true;
    } else {
      return false;
    }
  });

  if (user) {
    const token = jwt.sign({
        username:username
    },JWT_SECRET);



    user.token = token;

    res.json({
      message: "The token of this user is " + token,
    });
  } else {
    // 403 - forbidded / Not Authorised
    res.status(403).json({
      message: "Invalid username and password",
    });
  }
  console.log(users);
});

app.get("/me", function (req, res) {
  const token = req.headers.token;
  // const foundUser = null;
  const decodedInf = jwt.verify(token, JWT_SECRET);
  const username = decodedInf.username;

  let foundUser = null;

  foundUser = users.find(function (u) {
    if (u.username == username) {
      return true;
    } else {
      return false;
    }
  });

  if (foundUser) {
    return res.json({
      //   username: foundUser.username,
      //   password: foundUser.password,
      message: "got it",
    });
  } else {
    return res.status(401).json({
      wrongUser: "User Not found",
    });
  }
});

app.listen(3000, function () {
  console.log("server started at 3000");
});
