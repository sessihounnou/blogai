const axios = require('axios');

const apiKey = '3mM44Ucgmpepr3_PkfEQz6vYcnnXLBEQdM7Bf';

const cardInfo = {
  name: 'John Doe',
  number: '4111111111111111',
  expirationMonth: '12',
  expirationYear: '2023',
  cvv: '123',
};

const planInfo = {
  planId: '123456',
  quantity: 1,
  term: 12,
};

axios.post('https://api.godaddy.com/v1/buy/order', {
  paymentProfile: cardInfo,
  items: [planInfo],
}, {
  headers: {
    Authorization: `sso-key ${apiKey}`,
    'Content-Type': 'application/json',
  },
})
.then((response) => {
  const orderInfo = response.data;

  console.log(`Commande enregistrée avec succès. Numéro de commande : ${orderInfo.orderNumber}`);
})
.catch((error) => {
  console.error(`Erreur lors de l'achat : ${error}`);
});
