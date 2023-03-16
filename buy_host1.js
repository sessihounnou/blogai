const express = require('express');
const axios = require('axios');

const app = express();
const port = 4444;

const KEY = '3mM44Ucgmpepr3_PkfEQz6vYcnnXLBEQdM7Bf';
const SECRET = 'CccMpbXVRb2XqjQZT85eGD';
const URL = 'https://api.godaddy.com/v1/oauth2/token';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware pour récupérer le token d'accès
async function getAccessToken() {
  const response = await axios.post(URL, {
    grant_type: 'client_credentials',
    client_id: KEY,
    client_secret: SECRET,
    scope: 'https://api.godaddy.com/oauth/authorize'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data.access_token;
}

// Récupération des informations de l'utilisateur
app.post('/auth', async (req, res) => {
  const accessToken = await getAccessToken();
  const { cardNumber, expirationMonth, expirationYear, cvc } = req.body;

  // Authentification de l'utilisateur tierce
  try {
    const authResponse = await axios.post('https://api.godaddy.com/v1/customers/auth', {
      cardNumber,
      expirationMonth,
      expirationYear,
      cvc
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(authResponse.data);
  } catch (error) {
    res.status(400).json({ message: error.response.data.message });
  }
});

// Achat d'un hébergement
app.post('/hosting', async (req, res) => {
  const accessToken = await getAccessToken();
  const { domain, planId } = req.body;

  // Achat d'un hébergement pour l'utilisateur authentifié
  try {
    const response = await axios.post(`https://api.godaddy.com/v1/customers/${req.customerId}/orders`, {
      items: [
        {
          type: 'hosting',
          planId: 'planId',
          domain: {
            name: domain,
            contactAdmin: {
              nameFirst: req.firstName,
              nameLast: req.lastName,
              email: req.email,
              phone: req.phone,
              addressMailing: {
                address1: req.address1,
                address2: req.address2,
                city: req.city,
                state: req.state,
                postalCode: req.postalCode,
                country: req.country
              }
            }
          },
          period: {
            unit: 'months',
            length: 12
          },
          quantity: 1
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.response.data.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
