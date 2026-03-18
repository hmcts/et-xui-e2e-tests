import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';

test.describe('Initial Consideration Tests', () => {
  let caseId: string, caseNumber: string;

  test.beforeEach(async () => {
   ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
  });

  test(
    'Initial Consideration - Preliminary Hearing options ',
    { tag: '@demo' },
    async ({ manageCaseDashboardPage, caseListPage, loginPage, caseDetailsPage, initialConsiderationPage}) => {
      await manageCaseDashboardPage.visit();
      //judge log in
      await loginPage.processLogin(
        config.etEnglandJudge.email,
        config.etEnglandJudge.password,
        config.loginPaths.cases,
      );
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      await caseListPage.selectNextEvent('Initial Consideration');
      await initialConsiderationPage.preliminaryHearingDetails()
      await caseListPage.navigateToTab('ICTab');
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Initial Consideration',
          tabContent: [
            { tabItem: 'Type of preliminary hearing', value: 'Video' },
            { tabItem: 'Purpose of preliminary hearing', value: 'Preliminary issue' },
            { tabItem: 'Length of hearing', value: '1' },

          ],
        },
      ]);
    },
  );

  test(
    'Initial Consideration - Case Management Hearing Options ',
    { tag: '@demo' },
    async ({ manageCaseDashboardPage, caseListPage, loginPage, caseDetailsPage, initialConsiderationPage,listHearingPage}) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseListPage.selectNextEvent(Events.listHearing.listItem);
      await listHearingPage.listCase('EnglandWales', 0,'Leeds ET','Preliminary Hearing (CM)');
      await caseListPage.selectNextEvent('Initial Consideration');
      await initialConsiderationPage.caseManagementHearingOptions()
      await caseListPage.navigateToTab('ICTab');
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Initial Consideration',
          tabContent: [
            { tabItem: 'Is this hearing judge alone or with members?', value: 'JSA' },
            { tabItem: 'Hearing With Jsa', value: 'Case management only' },

          ],
        },
      ]);
    },
  );

  test(
    'Initial Consideration - Final Hearing Options ',
    { tag: '@demo' },
    async ({ manageCaseDashboardPage, caseListPage, loginPage, caseDetailsPage, initialConsiderationPage,listHearingPage}) => {
      await manageCaseDashboardPage.visit();

      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseListPage.selectNextEvent(Events.listHearing.listItem);
      await listHearingPage.listCase('EnglandWales', 0,'Leeds ET','Final Hearing');

      await caseListPage.selectNextEvent('Initial Consideration');
      await initialConsiderationPage.finalHearingOptions()
      await caseListPage.navigateToTab('ICTab');
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Initial Consideration',
          tabContent: [
            { tabItem: 'Is this hearing judge alone or with members?', value: 'With members' },
            { tabItem: 'Hearing With Members reasons', value: 'Already decided' },

          ],
        },
      ]);
    },
  );





});



