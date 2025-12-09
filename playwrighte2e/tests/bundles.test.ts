import { test } from '../fixtures/common.fixture';
import { params } from "../config/config";
import { Events } from '../config/case-data';
import DateUtilComponent from '../utils/DateUtilComponent';

const respondentName = 'Mrs Test Auto';
let subRef: string, submissionRef: string;
let caseNumber: string;

test.describe('England - Caseworker Bundles test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

    test('Bundles - Legal rep submit hearing preparation document - England & Wales',
      async ({ page, et1CaseServingPage, caseListPage, listHearingPage, loginPage, legalRepPage,uploadDocumentsForHearingPage,checkYourAnswersPage, caseDetailsPage }) => {
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
        let region = 'EnglandWales';
        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase(region, 0,"Leeds ET");
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword, 'cases');
        const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;

        await legalRepPage.processNOCForClaimantOrRespondent(searchReference, subRef, caseNumber, firstName, lastName, false, true);
        await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')

        await caseListPage.selectNextEvent('Upload documents for hearing');
        const date = DateUtilComponent.formatToDayMonthYear(DateUtilComponent.addWeekdays(new Date(), 21));
        // //Verify only future hearings are shown in the options
        await uploadDocumentsForHearingPage.submitDocumentForHearing(
          {
            agreementOption: 'Yes',
            hearingOption: `1 Costs Hearing - Leeds ET - ${date}`,
            hearingList: [`1 Costs Hearing - Leeds ET - ${date}`],
            whoseDocuments: 'Both Parties',
            documentType: 'Witness statement only',
          }, checkYourAnswersPage
        )
        await caseDetailsPage.checkHasBeenCreated(Events.uploadDocumentsForHearing);
        await caseDetailsPage.assertTabData([
          {
            tabName: 'Hearing Documents',
            tabContent: [
              `Respondent Hearing Documents`,
              { tabItem: `Hearing`, value: `Uploaded date | Document` },
              { tabItem: `1 Costs Hearing - Leeds ET - ${date}`, value: `${DateUtilComponent.getUtcDateTimeFormatted()} | welshTest.pdf`, clickable: true, exact: false },
              { tabItem:`Have you agreed these documents with the other party?`, value: `Yes` },
              { tabItem: `Type`, value: `Witness statements only`},
              { tabItem: `Whose hearing documents are you uploading?`, value: `Both parties' hearing documents combined` }
            ]
          }
        ]);
    });
});

test.describe('Scotland - Caseworker Bundles test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "Scotland", "ET_Scotland"));
    });

    //Flaky xui- claimant tab issue
    test.skip('Bundles - Legal rep submit hearing preparation document - Scotland', {tag: '@demo'},
      async ({ page, et1CaseServingPage, caseListPage, loginPage, legalRepPage, listHearingPage, uploadDocumentsForHearingPage,checkYourAnswersPage, caseDetailsPage  }) => {
      const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();
       // await bundleSteps.submitHearingPreparationDocument(page, 'Scotland', subRef, respondentName, firstName, lastName);

        let region = 'Scotland';
        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase(region, 1,"Glasgow ET", 'Scotland');
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
        const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;

        await legalRepPage.processNOCForClaimantOrRespondent(searchReference, subRef, caseNumber, firstName, lastName, false, true);
        await caseListPage.navigateToCaseDetails(subRef, 'Scotland')

        await caseListPage.selectNextEvent('Upload documents for hearing');
        await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Both Parties', 'Witness statement only');
        await caseListPage.navigateToTab('Hearing Documents');
        await legalRepPage.verifyHearingDocumentTabLegalRep();
    });
});

test.describe('England - Claimant Bundles test', () => {

    test.beforeEach(async ({ page, createCaseStep}) => {

        ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, false));
    });

    test('Bundles - Claimant Submitting hearing preparation document - England', {tag: '@demo'},
        async ({ page, caseListPage, et1CaseServingPage, listHearingPage, loginPage, legalRepPage, citizenHubPage }) => {

        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales', 0,'Amersham');
        await page.click('text=Sign out');

        await loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword, 'cases');
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, false);

        await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
        await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
        await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
        await citizenHubPage.regAccountContactTribunal('submit document for hearing');
        await citizenHubPage.submitDocumentForHearingClaimant();
    });

});


