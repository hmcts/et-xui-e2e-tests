import { test } from "../fixtures/common.fixture";
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import assert = require('node:assert');

let caseNumber: any;
let subRef: any;


test.describe('Close Case & Reinstate Case', () => {
  test.beforeEach(async ({page, createCaseStep}) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

  });

  test('Create a claim , Close case  & Reinstate Case', async ({page, caseListPage, jurisdictionPage, closeCasePage,reinstateCasePage}) => {
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.closeJurisdictionCode();
    await caseListPage.selectNextEvent('Close Case');
    await closeCasePage.closeCase();
     //RET-6047 Close Case and validate TTL
    const createCaseThroughApi = new CreateCaseThroughApi(page);
    const caseData = await createCaseThroughApi.getCaseDataForCaseWorker(subRef);
    const systemTtl = caseData.case_data.TTL.SystemTTL;
    const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const formattedDate = nextYear.toISOString().split('T')[0];
    assert(systemTtl === formattedDate);
    // Reinstate case and validate  TTL is 100 years
    //RET-6047
    await caseListPage.selectNextEvent('Reinstate Case');
    await reinstateCasePage.reinstateCase();
    const caseData1 = await createCaseThroughApi.getCaseDataForCaseWorker(subRef);
    const systemTtl1 = caseData1.case_data.TTL.SystemTTL;
    const next100Year = new Date(new Date().setFullYear(new Date().getFullYear() + 100));
    const formattedDate1 = next100Year.toISOString().split('T')[0];
    assert(systemTtl1 === formattedDate1);
  });
});
