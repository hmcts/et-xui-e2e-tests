import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

let caseId: string;
let caseNumber: string;

test.describe('Respondent details test', () => {

    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    });

    test(
      'England - Respondent details',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, caseListPage, respondentDetailsPage, icUploadDocPage }) => {
        await caseListPage.selectNextEvent('Respondent Details');
        // Check case file view
        await respondentDetailsPage.processPanelPreference();
        await caseListPage.navigateToTab('Respondent');
        await respondentDetailsPage.verifyRespondentDetails();

        //sign out as caseworker
        await caseListPage.signoutButton();

        //judge log in
        await loginPage.processLogin(
          config.etEnglandJudge.email,
          config.etEnglandJudge.password,
          config.loginPaths.cases,
        );
        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        await caseListPage.selectNextEvent('Initial Consideration');
        await icUploadDocPage.verifyRespondentHearingPanelValues();
      },
    );
});
