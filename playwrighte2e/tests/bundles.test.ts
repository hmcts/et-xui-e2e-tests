import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data';
import DateUtilComponent from '../data-utils/DateUtilComponent';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseId: string;
let caseNumber: string;

test.describe('England - Caseworker Bundles test', () => {

    test.beforeEach(async () => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test('Bundles - Legal rep submit hearing preparation document - England & Wales', async ({
      manageCaseDashboardPage,
      caseListPage,
      listHearingPage,
      loginPage,
      uploadDocumentsForHearingPage,
      checkYourAnswersPage,
      caseDetailsPage,
      nocPage,
    }) => {
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      let region = 'EnglandWales';
      await caseListPage.selectNextEvent('List Hearing');
      await listHearingPage.listCase(region, 0, 'Leeds ET');
      await manageCaseDashboardPage.signOut();

      await loginPage.processLogin(
        config.etLegalRepresentative.email,
        config.etLegalRepresentative.password,
        config.loginPaths.cases,
      );
      //const searchReference = region === 'England' ? 'Eng/Wales - Singles' : `${region} - Singles`;
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

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
        },
        checkYourAnswersPage,
      );
      await caseDetailsPage.checkHasBeenCreated(Events.uploadDocumentsForHearing);
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Hearing Documents',
          tabContent: [
            `Respondent Hearing Documents`,
            { tabItem: `Hearing`, value: `Uploaded date | Document` },
            {
              tabItem: `1 Costs Hearing - Leeds ET - ${date}`,
              value: `${DateUtilComponent.getUtcDateTimeFormatted()} | welshTest.pdf`,
              clickable: true,
              exact: false,
            },
            { tabItem: `Have you agreed these documents with the other party?`, value: `Yes` },
            { tabItem: `Type`, value: `Witness statements only` },
            {
              tabItem: `Whose hearing documents are you uploading?`,
              value: `Both parties' hearing documents combined`,
            },
          ],
        },
      ]);
    });
});

test.describe('Scotland - Caseworker Bundles test', () => {

    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createScotlandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.Scotland);
    });

    //Flaky xui- claimant tab issue
    test(
      'Bundles - Legal rep submit hearing preparation document - Scotland',
      { tag: '@demo' },
      async ({ page, manageCaseDashboardPage, caseListPage, loginPage, legalRepPage, listHearingPage, nocPage }) => {
        // await bundleSteps.submitHearingPreparationDocument(page, 'Scotland', subRef, respondentName, firstName, lastName);

        let region = 'Scotland';
        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase(region, 0, 'Glasgow', 'Scotland');
        await page.click('text=Sign out');

        await loginPage.processLogin(
          config.etLegalRepresentative.email,
          config.etLegalRepresentative.password,
          config.loginPaths.cases,
        );
        await manageCaseDashboardPage.navigateToNoticeOfChange();
        await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.Scotland);

        await caseListPage.selectNextEvent('Upload documents for hearing');
        await legalRepPage.submitDocumentForHearingRespondent('Yes', 'Both Parties', 'Witness statement only');
        await caseListPage.navigateToTab('Hearing Documents');
        await legalRepPage.verifyHearingDocumentTabLegalRep();
      },
    );
});

test.describe('England - Claimant Bundles test', () => {

    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
      ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    });

    test(
      'Bundles - Claimant Submitting hearing preparation document - England',
      { tag: '@demo' },
      async ({
        manageCaseDashboardPage,
        caseListPage,
        listHearingPage,
        citizenHubLoginPage,
        citizenHubPage,
        prepareAbdSubmitDocumentPage,
      }) => {
        await caseListPage.selectNextEvent('List Hearing');
        await listHearingPage.listCase('EnglandWales', 0, 'Amersham');
        await manageCaseDashboardPage.signOut();

        await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
        await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
        await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
        await citizenHubPage.navigateToContactTheTribunalPage();
        await prepareAbdSubmitDocumentPage.submitDocumentsForHearing();
      },
    );
});
