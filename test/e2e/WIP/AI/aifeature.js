const postcode = 'LS9 9HE';
// const workPostcode = 'LS7 4QE';
// const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
// const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
// const firstLineOfAddress = '7, Valley Gardens?';

Feature('AI Sample');

Scenario('test ai features', async ({ I, basePage, loginPage }) => {
  I.amOnPage('/');
  await loginPage.registerNewAccount();
  await basePage.processPreLoginPagesForTheDraftApplication(postcode);
  await loginPage.processLoginWithNewAccount();
  pause();
}).tag('aisample');
