import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber;

test.describe('Citizen applications', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {
    ({ subRef, caseNumber } = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  test.skip('Citizen make an application, legal rep respond to it and caseworker validate documents - England', async ({
                                                                             page,
                                                                             citizenHubPage,
                                                                             loginPage,
                                                                             legalRepPage,
                                                                             et1CaseServingPage,
                                                                             caseListPage,
                                                                             applicationTabPage, documentsTabPage
                                                                           }) => {
    const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

    // perform NOC
    await page.click('text=Sign out');
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await legalRepPage.processNOC('Eng/Wales - Singles', subRef, respondentName, firstName, lastName);
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
    caseNumber = await caseListPage.processCaseFromCaseList();
    await page.click('text=Sign out');

    // Citizen rep make an application
    await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
    await citizenHubPage.makeAnApplication();
    await page.click('text=Sign out');

    // Legal Rep respond to an application
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
     await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
    caseNumber = await caseListPage.processCaseFromCaseList();

    await applicationTabPage.legalRepRespondToAnApplication();
    await page.click('text=Sign out');

    // Caseworker validates Document tab
    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
     await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
    caseNumber = await caseListPage.processCaseFromCaseList();

    await caseListPage.navigateToTab('Documents');
    await documentsTabPage.validateApplicationDocuments();
  });
});
