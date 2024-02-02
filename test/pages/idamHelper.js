const testConfig = require('../../config');
const request = require('request');

module.exports = {
  async createCitizenAccount() {
    let options = {
      'method': 'POST',
      'url': 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "forename": testConfig.TestEnvETClaimantFirstName,
        "surname": testConfig.TestEnvETClaimantLastName,
        "email": testConfig.TestEnvETClaimantEmailAddress,
        "password": "Adventure2023",
        "active": true,
        "roles": [
          {
            "code": "citizen"
          }
        ]
      })

    };
    request(options, function(error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }

};


