import { test } from '../fixtures/common.fixture';
import config from '../config/config';

const respondentName = 'Mrs Test Auto';
let subRef: string;
let caseNumber: string;

test.describe('Citizen applications', () => {
  //RET-5818
  test.beforeEach(async ({ page, createCaseStep}) => {
    ({ subRef, caseNumber } = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  test('Citizen make an application, legal rep respond to it and caseworker validate documents - England', async ({
                                                                             page,
                                                                             citizenHubLoginPage,
                                                                             citizenHubPage,
                                                                             loginPage,
                                                                             legalRepPage,
                                                                             et1CaseServingPage,
                                                                             caseListPage,
                                                                             applicationTabPage, documentsTabPage,
                                                                             contactTheTribunalPage
                                                                           }) => {
    await caseListPage.navigateToTab('Claimant');
    const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

    // perform NOC
    await page.click('text=Sign out');
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
    await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
    await page.click('text=Sign out');

    // Citizen rep make an application
    await citizenHubLoginPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(subRef);
    await citizenHubPage.navigateToContactTheTribunalPage();
    await contactTheTribunalPage.makeApplicationToTribunal('change personal details', 'Citizen made an application', 'Yes')
    await contactTheTribunalPage.clickSubmitButton();
    await contactTheTribunalPage.assertApplicationSentSuccessPageIsDisplayed();
    await contactTheTribunalPage.clickCloseAndReturn();
    await page.click('text=Sign out');

    // Legal Rep respond to an application
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    await applicationTabPage.legalRepRespondToAnApplication();
    await page.click('text=Sign out');

    // Caseworker validates Document tab
    await page.goto(config.TestUrlForManageCaseAAT);
    await loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
    caseNumber = await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    await caseListPage.navigateToTab('Documents');
    await documentsTabPage.validateApplicationDocuments();
  });
});
