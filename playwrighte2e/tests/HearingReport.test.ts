import { test } from '../fixtures/common.fixture';
import { CaseTypeLocation, Events } from '../config/case-data';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';

let caseId: string;
let caseNumber: string;

test.describe('E/W Hearing Reports', () => {
    test.beforeEach(async () => {

      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test('Generate Hearing Reports for Newcastle office', async ({
      manageCaseDashboardPage,
      loginPage, caseListPage,
      listHearingPage,
      caseDetailsPage,
    }) => {
      await manageCaseDashboardPage.visit();
      //judge log in
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      //List 1 hearing for the case
      await caseListPage.selectNextEvent(Events.listHearing.listItem);
      await listHearingPage.listCase('EnglandWales', 0, 'Newcastle CFCTC');
      await caseDetailsPage.checkHasBeenCreated(Events.listHearing);

      await caseListPage.searchHearingReports('Eng/Wales - Hearings/Reports', 'Hearing Documents', 'Newcastle');
      await caseListPage.selectHearingReport();
      await caseListPage.selectNextEvent('Generate Report');
      await caseListPage.generateReport();
      await caseListPage.validateHearingReport(caseNumber);
    });
});
