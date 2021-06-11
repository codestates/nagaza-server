const express = require("express");
const session = require('express-session');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

require("./models");

//const userControllers = require("./controllers/user");
//const groupControllers = require("./controllers/group");

const app = express();

const port = 80;

//express-session 설정
app.use(
  session({
    secret: '@nagaza',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    }
  })
)

app.use(express.json());

//cors 설정
app.use(cors({
  origin: true,
  credentials: true
}))

//user-endpoints
// app.get("/user/userinfo", userControllers.userInfo);
// app.post("/user/signup/isvalidusername", userControllers.validUsername);
// app.post("/user/signup/isvalidemail", userControllers.validEmail);
// app.post("/user/signup", userControllers.signUp);
// app.post("/user/sigin", userControllers.signIn);
// app.post("/user/signout", userControllers.signOut);
// app.post("/user/socialsignin", userControllers.socialSignIn);
// app.post("/user/updateuserinfo", userControllers.updateUserInfo);
// app.post("/user/updateuserinfo/preference", userControllers.updateUserPreference);

//group-endpoints
// app.get("/group/groupinfo", groupControllers.groupInfo);
// app.post("/group/creategroup", groupControllers.createGroup);
// app.post("/group/deletegroup", groupControllers.deleteGroup);
// app.post("/group/joingroup", groupControllers.joinGroup);
// app.post("/group/unjoingroup", groupControllers.unjoinGroup);
// app.post("/group/updategroupinfo", groupControllers.updateGroupInfo);
// app.post("/group/imminentgroupinfo", groupControllers.imminentGroupInfo);

//https-server
const server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app
    )
    .listen(port, () => {
        console.log(`server listen in ${port}`)
    });

module.exports = server;