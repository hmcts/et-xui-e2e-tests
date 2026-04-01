import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';

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
      async ({ manageCaseDashboardPage, loginPage, caseListPage, respondentDetailsPage, icUploadDocPage, caseDetailsPage }) => {
        await caseDetailsPage.selectNextEvent(Events.respondentDetails);
        // Check case file view
        await respondentDetailsPage.processPanelPreference();
        await caseDetailsPage.navigateToTab('Respondent');
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
        await caseDetailsPage.selectNextEvent(Events.initialConsideration);
        await icUploadDocPage.verifyRespondentHearingPanelValues();
      },
    );
});
