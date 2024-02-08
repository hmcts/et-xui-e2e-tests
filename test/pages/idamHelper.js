//const request = require('request');
const {expect} = require('chai');
const testConfig = require('../../config');

module.exports = {
  async createCitizenAccount() {
    const url = 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts';
    const headers = {
      'Content-Type': 'application/json',
    };
    const payload = JSON.stringify({
      forename: testConfig.TestEnvETClaimantFirstName,
      surname: testConfig.TestEnvETClaimantLastName,
      email: testConfig.TestEnvETClaimantEmailAddress,
      password: 'Adventure2023',
      active: true,
      roles: [
        {
          code: 'citizen',
        },
      ]
    });
    try {
      const idamResponse = await I.sendPostRequest(url,payload,headers);
      expect(idamResponse.status).to.eql(201);
      console.log(idamResponse.status);
      console.log(idamResponse.email);
      if (!idamResponse.ok) {
        throw new Error(`HTTP error! Status: ${idamResponse.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
};
