const axios = require('axios');

const apiKey = 'API_KEY';
const apiSecret = 'API_SECRET';

const baseUrl = 'https://api.godaddy.com/v1';

async function createSubAccount(username, password, email) {
  try {
    const response = await axios.post(`${baseUrl}/customers`, {
      email: email,
      nameFirst: username,
      nameLast: 'Lastname',
      password: password,
      phone: '+1.4805058800',
      marketId: 'en-US',
      agreedToTerms: true,
      customerType: 'INDIVIDUAL'
    }, {
      headers: {
        'Authorization': `sso-key ${apiKey}:${apiSecret}`,
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    });

    console.log('Le sous-compte a été créé avec succès !');
    console.log(`Nom d'utilisateur : ${response.data.customerId}`);
    console.log(`Mot de passe : ${password}`);
    console.log(`x-shopper-id : ${response.data.shopperId}`);
    return response.data.shopperId;
  } catch (error) {
    console.error(`Une erreur est survenue : ${error.message}`);
  }
}

createSubAccount('john', 'password123', 'john@example.com');
