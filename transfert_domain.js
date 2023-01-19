const axios = require('axios');

const apiKey = 'your_api_key';
const domain = 'example.com';
const authCode = 'your_auth_code';

axios({
  method: 'put',
  url: `https://api.godaddy.com/v1/domains/${domain}/transfer`,
  headers: {
    'Authorization': `sso-key ${apiKey}`,
    'Content-Type': 'application/json'
  },
  data: {
    authCode
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });