import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';

let caseId: string;
let caseNumber: string;

test.describe('Upload Hearing Bundle as a Caseworker', () => {
  test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
  });

  //RET-5927
  test('Caseworker uploads hearing bundle', async ({
    manageCaseDashboardPage,
    caseListPage,
    uploadHearingBundlePage,
    nocPage,
    listHearingPage,
    loginPage,
  }) => {
    //List 2 hearings for the case
    const hearingNumbers: number[] = [0, 1];
    for (const number of hearingNumbers) {
      await caseListPage.selectNextEvent(Events.listHearing.listItem);
      await listHearingPage.listCase('EnglandWales', number, 'Leeds ET');
    }
    await manageCaseDashboardPage.signOut();

    await loginPage.processLogin(
      config.etLegalRepresentative.email,
      config.etLegalRepresentative.password,
      config.loginPaths.cases,
    );
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);

    await manageCaseDashboardPage.signOut();

    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseListPage.selectNextEvent('Upload Hearing Documents');
    await uploadHearingBundlePage.uploadHearingBundleDocuments();
    await caseListPage.navigateToTab('Hearing Documents');
    await uploadHearingBundlePage.validateHearingDocument();
    await manageCaseDashboardPage.signOut();
  });
});
