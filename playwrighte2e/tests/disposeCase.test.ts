import { test } from '../fixtures/common.fixture';
import CreateCaseThroughApi from '../pages/createCaseThroughApi';
import assert from 'node:assert';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';

let caseNumber: any;
let caseId: any;

test.describe('Close Case & Reinstate Case', () => {
  test.beforeEach(async () => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
  });

  test('Create a claim , Close case  & Reinstate Case',
    async ({
    manageCaseDashboardPage, loginPage,
    caseListPage,
    jurisdictionPage,
    closeCasePage,
    reinstateCasePage,
  }) => {

      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      await caseListPage.selectNextEvent('Jurisdiction');
      await jurisdictionPage.closeJurisdictionCode();
      await caseListPage.selectNextEvent('Close Case');
      await closeCasePage.closeCase();
      // delay added to ensure that the case is closed before fetching the case data for TTL validation
      await manageCaseDashboardPage.delay(5000);
      //RET-6047 Close Case and validate TTL
      const caseData = await CitizenClaimantFactory.getCaseDataForCaseWorker(caseId);
      const systemTtl = caseData.case_data.TTL.SystemTTL;
      const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      const formattedDate = nextYear.toISOString().split('T')[0];
      assert(systemTtl === formattedDate);
      // Reinstate case and validate  TTL is 100 years
      //RET-6047
      await caseListPage.selectNextEvent('Reinstate Case');
      await reinstateCasePage.reinstateCase();
      const caseData1 = await CitizenClaimantFactory.getCaseDataForCaseWorker(caseId);
      const systemTtl1 = caseData1.case_data.TTL.SystemTTL;
      const next100Year = new Date(new Date().setFullYear(new Date().getFullYear() + 100));
      const formattedDate1 = next100Year.toISOString().split('T')[0];
      assert(systemTtl1 === formattedDate1);
      await manageCaseDashboardPage.signOut();
  });
});
