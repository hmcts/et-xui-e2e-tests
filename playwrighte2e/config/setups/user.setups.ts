import { test } from '../../fixtures/common.fixture.ts';
import { users } from '../config.dynamic.ts';
import { CookieUtils } from '../../data-utils/cookie.utils.ts';

test.describe("set up user context", () => {
  const cookieName = 'session-freshness-check';
  const xuiUsers = [
    { role: 'Case Worker', user: users.etCaseWorker },
    { role: 'Legal Rep1', user: users.etLegalRepresentative },
    { role: 'Legal Rep2', user: users.etLegalRepresentative2 },
    { role: 'Judge', user: users.etEnglandJudge },
    { role: 'Legal Ops User', user: users.etManageCaseUser },
    { role: 'Judge Work Allocation', user: users.etWorkAllocationJudge}
  ];
  for (const { role, user } of xuiUsers) {
    test(
      `Set up ${role} user context`,
      async ({ loginPage, manageCaseDashboardPage }) => {
        if (CookieUtils.isSessionValid(user.sessionFile, cookieName)) {
          console.log(`Valid session already exists for ${role} (${user.email}), skipping login.`);
          return;
        }
        console.log(`Logging new session for ${role} (${user.email})`);
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(user);
      }
    );
  }

  test(
    'Set up Citizen Claimant user context',
    async({citizenHubLoginPage,})  => {
      const user = users.etClaimant;
      if(CookieUtils.isSessionValid(user.sessionFile, cookieName)) {
        console.log(`Valid session already exists for ${user.email}, skipping login.`);
        return;}
      await citizenHubLoginPage.processCitizenHubLogin(user);
    });

  test(
    'Set up Citizen Respondent user context',
    async({et3LoginPage})  => {
      const user = users.etRespondent;
      if(CookieUtils.isSessionValid(user.sessionFile, cookieName)) {
        console.log(`Valid session already exists for ${user.email}, skipping login.`);
        return;
      }
      await et3LoginPage.processRespondentLogin(user);
    });


});
