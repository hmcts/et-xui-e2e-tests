import { test } from '../fixtures/common.fixture';
import config from "../config/config";

let subRef: string, submissionRef: string;
let caseNumber: string;
const respName ='Mrs Test Auto';

test.describe('NOC Notification Banner', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5419
  test('Perform NOC and validate the notification banner in CUI',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, citizenHubPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber.toString(), firstName, lastName, false, false);
      await page.click('text=Sign out');

      //citizen validates notification banner
      await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
      await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.verifyLegalRepNotificationBanner();
      await citizenHubPage.contactTheTribunalLink();
    });

  //RET-5791
  test('Perform NOC and validate the notification banner in  Respondent UI',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, et3LoginPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber.toString(), firstName, lastName, false, true);
      await page.click('text=Sign out');


      //Assign a claim to respondent
      await et3LoginPage.processRespondentLogin(config.TestEnvET3RespondentEmailAddress, config.TestEnvET3RespondentPassword, caseNumber);
      await et3LoginPage.replyToNewClaim(subRef, caseNumber, respName, firstName, lastName);

      //citizen validates notification banner in respondent UI
      await et3LoginPage.validateNocNotificationBanner();

      // RET-6007 -change my legal representative- stop representation
      await et3LoginPage.stopLegalRepRepresentation();
    });

});

test.describe('Share case', () => {

  test.beforeEach(async ({ page, createCaseStep}) => {

    ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
  });

  //RET-5425
  test('Share case (respondent representative)',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, caseListPage, respondentRepPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber.toString(), firstName, lastName, false, true);
      await page.click('text=Sign out');

      //share case with other legal rep
      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
      await caseListPage.checkAndShareCaseFromList(subRef);
      caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');

      //validate share case details
      await caseListPage.navigateToTab('Respondent Representative');
      await respondentRepPage.validateRespondentRepDetail();
    });

  //RET-5425
  test('Share case (claimant representative)',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, caseListPage, respondentRepPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber.toString(), firstName, lastName, false, false);
      await page.click('text=Sign out');

      //share case with other legal rep
      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
      await caseListPage.checkAndShareCaseFromList(subRef);
      caseNumber = await caseListPage.navigateToCaseDetails(subRef.toString(), 'EnglandWales');


      //validate share case details
      await caseListPage.navigateToTab('Claimant Representative');
      await respondentRepPage.validateRespondentRepDetail();
    });

  //RET-5416
  test('Perform NOC and Remove claimant legal representative as a citizen, claimant reinstated case',
    async ({ page, et1CaseServingPage, loginPage, legalRepPage, citizenHubPage }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
      await page.click('text=Sign out');

      await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
      await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber.toString(), firstName, lastName, false, false);
      await page.click('text=Sign out');

      //remove claimant legal rep
      await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
      await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.changeMyLegalRep();
      await citizenHubPage.verifyLegalRepUnassignedNotificationBanner();
    });
});
