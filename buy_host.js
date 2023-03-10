const axios = require('axios');

const apiKey = '3mM44Ucgmpepr3_PkfEQz6vYcnnXLBEQdM7Bf';
const apiSecret = 'CccMpbXVRb2XqjQZT85eGD';

const data = {
    "items": [
        {
            "type": "hosting",
            "name": "hosting_name",
            "planId": "plan_id",
            "duration": 12,
            "quantity": 1,
            "renewAuto": true
        }
    ],
    "paymentProfile": {
        "paymentType": "creditCard",
        "name": "John Doe",
        "number": "4111111111111111",
        "expiration": "202203",
        "securityCode": "123"
    }
};

const config = {
    headers: {
        'Authorization': `sso-key ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json'
    }
};

axios.post('https://api.godaddy.com/v1/shopping/cart', data, config)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });
