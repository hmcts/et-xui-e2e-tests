import { test } from '../../fixtures/common.fixture.ts';
import { config, users } from '../config.dynamic.ts';

test.describe("set up user context", () => {
  const cookieName = 'session-freshness-check';
  test(
    'Set up case manager user context',
    async({loginPage, manageCaseDashboardPage, cookieUtils})  => {
      const user = users.etCaseWorker;
      if(cookieUtils.isSessionValid(user.sessionFile, cookieName)) {
        console.log(`Valid session already exists for ${user.email}, skipping login.`);
        return;
      }
      console.log('logging new session');
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(user.email, user.password);
      await loginPage.saveSession(user.sessionFile);
      await cookieUtils.addSessionFreshnessCookie(user.sessionFile, config.manageCaseBaseUrl);
    });

  test.skip(
    'Set up Citizen Claimant user context',
    async({loginPage, citizenHubLoginPage, cookieUtils})  => {
      const user = users.etClaimant;
      if(cookieUtils.isSessionValid(user.sessionFile, cookieName)) {
        console.log(`Valid session already exists for ${user.email}, skipping login.`);
        return;}
      await citizenHubLoginPage.processCitizenHubLogin(user.email, user.password);
      await loginPage.saveSession(user.sessionFile);
      await cookieUtils.addSessionFreshnessCookie(user.sessionFile, config.etSyaUiUrl);
    });

  test.skip(
    'Set up Citizen Respondent user context',
    async({loginPage, citizenHubLoginPage, cookieUtils})  => {
      const user = users.etRespondent;
      if(cookieUtils.isSessionValid(user.sessionFile, cookieName)) {
        console.log(`Valid session already exists for ${user.email}, skipping login.`);
        return;
      }
      await citizenHubLoginPage.processCitizenHubLogin(user.email, user.password);
      await loginPage.saveSession(user.sessionFile);
      await cookieUtils.addSessionFreshnessCookie(user.sessionFile, config.etSyrUiUrl);
    });
});
