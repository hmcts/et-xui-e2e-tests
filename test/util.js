const { I } = inject();

let username = process.env.TEST_CASE_USERNAME || 'et.caseworker.3@hmcts.net';
let password = process.env.TEST_CASE_PASSWORD || '6G!qmCd3';

function signInWithCredentials() {
  I.waitForElement('#username', 30);
  console.log(username, password);
  I.fillField('#username', username);
  I.fillField('#password', password);
  I.click('Sign in');
}
module.exports = { signInWithCredentials };
