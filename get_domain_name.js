const axios = require('axios');
// key= "3mM44UcgmbGvVu_M2n4hwUNCVKxtsTZU2MgG8"
// secret="LPsvHc2WgEideg3uyP5cFz"
const apiKey = 'fXqJUzhQRCb8_WYnvsnWZ3789MwC7Kz6639';
const apiSecret = 'ANLgjqChjEtEES1EyuAYHA';
const domain = 'bfgbtk.com';

const options = {
  method: 'GET',
  url: `https://api.godaddy.com/v1/domains/available?domain=${domain}`,
  headers: {
    'Authorization': `sso-key ${apiKey}:${apiSecret}`
  }
};

axios(options)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
