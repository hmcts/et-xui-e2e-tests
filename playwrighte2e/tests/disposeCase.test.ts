import { test } from "../fixtures/common.fixture";
import CreateCaseThroughApi from "../pages/createCaseThroughApi";
import assert = require('node:assert');

let caseNumber: any;
let subRef: any;


test.describe('Close Case', () => {
  test.beforeEach(async ({page, createCaseStep}) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

  });

  test('Create a claim and Close it', {tag: '@demo'}, async ({page, caseListPage, jurisdictionPage, closeCasePage}) => {
    await caseListPage.selectNextEvent('Jurisdiction');
    await jurisdictionPage.closeJurisdictionCode();
    await caseListPage.selectNextEvent('Close Case');
    await closeCasePage.closeCase();

    const createCaseThroughApi = new CreateCaseThroughApi(page);
    const caseData = await createCaseThroughApi.getCaseDataForCaseWorker(subRef);
    const systemTtl = caseData.case_data.TTL.SystemTTL;
    const nextYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const formattedDate = nextYear.toISOString().split('T')[0];
    assert(systemTtl === formattedDate);
  });
});
