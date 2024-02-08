const { I } = inject();
const axios = require('axios');
const testConfig = require('../../config');
const chance = require('chance').Chance();
//const firstName = chance.first();
//const lastName = chance.last();
//const emailAddress = firstName+'.'+lastName+'@mail.com';
const aatUrl = 'https://idam-api.aat.platform.hmcts.net/testing-support/accounts';

async function registerNewAccount() {
  try {
    let firstName = chance.first();
    let lastName = chance.last();
    let emailAddress = firstName+'.'+lastName+'@mail.com';
    let idamData = JSON.stringify({
      forename: firstName,
      surname: lastName,
      email: emailAddress,
      password: testConfig.TestEnvETPassword,
      active: true,
      roles: [
        {
          code: 'citizen',
        },
      ],
    });
    let headers = {
      'Content-Type': 'application/json',
    };
    console.log('url:', aatUrl);
    console.log('data:', idamData);
    let idamResponse = await axios.post(aatUrl, idamData, { headers });
    console.log('Response:', idamResponse.data);
    console.log('.... completed account registration');
    return idamResponse.data.email;
  }catch (error) {
    console.error('Error:', error.message);
    return null;
  }
};

async function processLoginWithNewAccount() {
  console.log(`${await registerNewAccount()}`)
  let email = await registerNewAccount();
  I.waitForVisible('#username', 15);
  console.log('.... checking email address:', email)
  I.fillField('#username', email);
  I.fillField('#password', testConfig.TestEnvETPassword);
  I.waitForElement('[type="submit"]', 10);
  I.forceClick('[type="submit"]');
  I.wait(10);
};

async function processLoginOnXui(username, password) {
  I.waitForVisible('#username', 15);
  I.fillField('#username', username);
  I.fillField('#password', password);
  I.waitForElement('[type="submit"]', 10);
  await I.forceClick('[type="submit"]');
  I.wait(10);
};

module.exports = {
  registerNewAccount,
  processLoginWithNewAccount,
  processLoginOnXui
};
