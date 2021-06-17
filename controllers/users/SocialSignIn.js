const axios = require('axios');
require('dotenv').config();
const { user } = require('../../models');
const qs = require('querystring');

const kakaoClientID = process.env.KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const kakaoRedirectUri = process.env.KAKO_REDIRECT_URI;

module.exports = {
  post : async (req, res) => {
    const { authorizationCode } = req.body
    //console.log('인가코드: ', authorizationCode)
    
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
      const access_token = response.data.access_token;
      
      // axios({
      //   method: "GET",
      //   url: "https://kapi.kakao.com/v2/user/me",
      //   headers: {
      //     Authorization: `Bearer ${access_token}`
      //   }
      // })
      // .then(res => console.log(res))

      
      res.status(200).send({ accessToken: access_token })
      
    })
    .catch(err => res.status(405).send(err))
  }
}