import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';


let caseNumber: string;
let caseId: string;

test.describe('Claimant details test', () => {

    test.beforeEach(async () => {

      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test('England - Claimant details', {tag: ['@ccd-callback-tests', '@demo']}, async ({manageCaseDashboardPage, loginPage, caseListPage, claimantDetailsPage, icUploadDocPage }) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(
        config.etCaseWorker.email,
        config.etCaseWorker.password,
        config.loginPaths.worklist,
      );

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(
        caseId,
        CaseTypeLocation.EnglandAndWales,
      );
      await caseListPage.selectNextEvent('Claimant Details');
      // Check case file view
      await claimantDetailsPage.processClaimantDetails(true);
      await caseListPage.navigateToTab('Claimant');
      await claimantDetailsPage.verifyClaimantDetails();

      //sign out as caseworker
      await manageCaseDashboardPage.signOut();

      //judge log in
      await loginPage.processLogin(config.etEnglandJudge.email, config.etEnglandJudge.password, config.loginPaths.cases);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseListPage.selectNextEvent('Initial Consideration');
      await icUploadDocPage.verifyClaimantHearingPanelValues();
    });
});
