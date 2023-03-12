const axios = require('axios');

const apiKey = 'fXqJUzhQRCb8_WYnvsnWZ3789MwC7Kz6639';
// const apiSecret = 'ANLgjqChjEtEES1EyuAYHA';
const domain = 'bfgbtk.com';

axios({
  method: 'post',
  url: `https://api.godaddy.com/v1/domains/purchase`,
  headers: {
    'Authorization': `sso-key ${apiKey}`,
    'Content-Type': 'application/json'
  },
  data: {
    "domain": domain,
    "duration": 1,
    "renewAuto": true,
    "privacy": true
  }
})
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });