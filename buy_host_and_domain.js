const https = require('https');
const axios = require('axios');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, // ignore self-signed certificate
  });

const xShopperId = 'your_shopper_id_here';
const data = {
  consent: {
    agreedAt: 'string',
    agreedBy: 'string',
    agreementKeys: [
      'string'
    ]
  },
  contactAdmin: {
    addressMailing: {
      address1: 'string',
      address2: 'string',
      city: 'string',
      country: 'US',
      postalCode: 'string',
      state: 'string'
    },
    email: 'user@example.com',
    fax: 'string',
    jobTitle: 'string',
    nameFirst: 'string',
    nameLast: 'string',
    nameMiddle: 'string',
    organization: 'string',
    phone: 'string'
  },
  contactBilling: {
    addressMailing: {
      address1: 'string',
      address2: 'string',
      city: 'string',
      country: 'US',
      postalCode: 'string',
      state: 'string'
    },
    email: 'user@example.com',
    fax: 'string',
    jobTitle: 'string',
    nameFirst: 'string',
    nameLast: 'string',
    nameMiddle: 'string',
    organization: 'string',
    phone: 'string'
  },
  contactRegistrant: {
    addressMailing: {
      address1: 'string',
      address2: 'string',
      city: 'string',
      country: 'US',
      postalCode: 'string',
      state: 'string'
    },
    email: 'user@example.com',
    fax: 'string',
    jobTitle: 'string',
    nameFirst: 'string',
    nameLast: 'string',
    nameMiddle: 'string',
    organization: 'string',
    phone: 'string'
  },
  contactTech: {
    addressMailing: {
      address1: 'string',
      address2: 'string',
      city: 'string',
      country: 'US',
      postalCode: 'string',
      state: 'string'
    },
    email: 'user@example.com',
    fax: 'string',
    jobTitle: 'string',
    nameFirst: 'string',
    nameLast: 'string',
    nameMiddle: 'string',
    organization: 'string',
    phone: 'string'
  },
  domain: 'example.com',
  nameServers: [
    'string'
  ],
  period: 1,
  privacy: false,
  renewAuto: true
};

axios.post('https://api.ote-godaddy.com/v1/domains/purchase', data, {httpsAgent}, {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopper-Id': xShopperId
  }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});
