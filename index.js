const express = require("express");
const session = require('express-session');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/groups');

require("./models");

//const userControllers = require("./controllers/users/SignOut");
//const groupControllers = require("./controllers/group");

const app = express();
app.use(express.json());
const port = 4000;

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

//cors 설정
app.use(cors({
  origin: true,
  credentials: true
}))

//router 연결
app.use('/user', usersRouter)
app.use('/group', groupsRouter)

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