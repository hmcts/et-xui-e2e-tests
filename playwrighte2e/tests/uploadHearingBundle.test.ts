import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;


test.describe('Upload Hearing Bundle as a Caseworker', () => {
  test.beforeEach(async ({ page, createCaseStep }) => {
    ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
  });

  //RET-5927
  test('Caseworker uploads hearing bundle', async ({ caseListPage, uploadHearingBundlePage, et1CaseServingPage, listHearingPage, page, loginPage, legalRepPage}) => {

    //Retrieve claimant's first name and last name for NoC
    const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

    //List 2 hearings for the case
    const hearingNumbers: number[] = [1, 2];
    for(const number of hearingNumbers) {
      await caseListPage.selectNextEvent('List Hearing');
      await listHearingPage.listCase('EnglandWales', number, false);
    }
    await page.click('text=Sign out');

    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);
    await  caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')
    await caseListPage.selectNextEvent('Upload Hearing Documents');
    await uploadHearingBundlePage.uploadHearingBundleDocuments();
    await caseListPage.navigateToTab('Hearing Documents');
    await uploadHearingBundlePage.validateHearingDocument();
  });
});
