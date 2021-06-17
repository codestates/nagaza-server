const axios = require('axios');
require('dotenv').config();
const { user } = require('../../models');

const kakaoClientID = process.env.KAKAO_CLIENT_ID;
const kakaoClientSecret = process.env.KAKAO_CLIENT_SECRET;
const kakaoRedirectUri = 'http://localhost:3000/landingpage'; 

module.exports = {
  post : async (req, res) => {
    console.log(req)
    const { authorizationCode } = req.body
    
    await axios.post('https://kauth.kakao.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: kakaoClientID,
        client_secret: kakaoClientSecret,
        redirect_uri: kakaoRedirectUri,
        code: authorizationCode
    }, {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    })
    .then(response => {
      console.log(response)
      res.status(200).send({ accessToken: response.data.access_token })
      user.create({
        username: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        location: '',
        social_id: response.data.access_token
      })
    })
    .catch(err => res.status(405).send({ message: "error" }))
  }
}