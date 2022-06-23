const { I } = inject();

let username = process.env.TEST_CASE_USERNAME || '';
let password = process.env.TEST_CASE_PASSWORD || '';

async function signInWithCredentials() {
  I.waitForElement('#username', 30);
  console.log(username, password);
  I.fillField('#username', username);
  I.fillField('#password', password);
  await I.click('Sign in');
}
module.exports = { signInWithCredentials };
