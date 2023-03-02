/*const request = require('request')

request('https://graph.facebook.com/111729228514276/feed?message=itworksperfectly&fields=created_time,from,id,message&access_token=EAAHggLTsIXoBAO316liUNZBQZAxjH513dAEZCyHB0tsFeBn7Sth3mDEPtjz0C0iZAzMUGjR8oOJ2mP5qcpiLZAkaEV8B9OIzzXlcsFGZAFVk4cXHWbTWayZBMawlQJoUZBjG46z1ucDYMNKX2FHRvJBe15DVYdhxTQvYfZBDVo2Rq9sABc4G7EMljQNMcufpHAdb3b4JeXfvEs6OGCPMDXYrF', function (error, response, body) {
  console.error('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
});*/
const axios = require('axios');

axios.post('https://graph.facebook.com/v13.0/111729228514276/feed', {
  message: 'Hello World!'
}, {
  params: {
    access_token: 'EAAHggLTsIXoBAO316liUNZBQZAxjH513dAEZCyHB0tsFeBn7Sth3mDEPtjz0C0iZAzMUGjR8oOJ2mP5qcpiLZAkaEV8B9OIzzXlcsFGZAFVk4cXHWbTWayZBMawlQJoUZBjG46z1ucDYMNKX2FHRvJBe15DVYdhxTQvYfZBDVo2Rq9sABc4G7EMljQNMcufpHAdb3b4JeXfvEs6OGCPMDXYrF'
  }
})
.then(function (response) {
  console.log('Message posted successfully!');
})
.catch(function (error) {
  console.log(error);
});
