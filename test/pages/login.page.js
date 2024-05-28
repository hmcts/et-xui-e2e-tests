const { I } = inject();
const axios = require('axios');
const chance = require('chance').Chance();

const testConfig = require('../../config.js');
//const firstName = chance.first();
//const lastName = chance.last();
//const emailAddress = firstName+'.'+lastName+'@mail.com';
const aatUrl = testConfig.IdamAcccountUrl;

async function registerNewAccount() {
  try {
    let firstName = chance.first();
    let lastName = chance.last();
    let lastFour = chance.ssn({ ssnFour: true });
    let emailAddress = firstName + '.' + lastName + lastFour + '@email.com';
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
    return {
      email: idamResponse.data.email,
      firstName: idamResponse.data.forename,
      lastName: idamResponse.data.surname,
    };
  } catch (error) {
    return error.message;
  }
}

async function processLoginWithNewAccount() {
  //console.log(`${await registerNewAccount()}`);
 // const { email } = await registerNewAccount();
  const email='et1.citizen@hmcts.net';
  I.waitForElement('#username', 20);
  console.log('.... checking email address:', email);
  I.fillField('#username', email);
  I.fillField('#password', testConfig.TestEnvETPassword);
  I.waitForElement('[type="submit"]', 10);
  I.forceClick('[type="submit"]');
  I.wait(15);
}

async function processLoginOnXui(username, password) {
  I.waitForVisible('#username', 15);
  I.fillField('#username', username);
  I.fillField('#password', password);
  I.waitForElement('[type="submit"]', 10);
  await I.forceClick('[type="submit"]');
  I.wait(10);
}

module.exports = {
  registerNewAccount,
  processLoginWithNewAccount,
  processLoginOnXui,
};
