const axios = require('axios');
require('dotenv').config();
const { user } = require('../../models');
const qs = require('querystring');

const kakaoClientID = process.env.KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const kakaoRedirectUri = `http://localhost:3000/landingpage`;

module.exports = {
  post : async (req, res) => {
    const { authorizationCode } = req.body
    console.log('인가코드: ', authorizationCode)
    
    await axios({
      method: "POST",
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify({
        grant_type: "authorization_code",
        client_id: kakaoClientID,
        client_secret: kakaoClientSecret,
        redirect_uri: kakaoRedirectUri,
        code: authorizationCode
      })
    })
    .then(response => {
      console.log(response)
      res.status(200).send({ accessToken: response.data.access_token })
      // user.create({
      //   username: '',
      //   email: '',
      //   password: '',
      //   age: '',
      //   gender: '',
      //   location: '',
      //   social_id: response.data.access_token
      // })
    })
    .catch(err => res.status(404).send({ message: "error" }))
  }
}