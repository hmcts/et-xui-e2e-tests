import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data';
import DateUtilComponent from '../data-utils/DateUtilComponent';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';

let caseId: string;
let caseNumber: string;

test.describe('Upload hearing docs test', () => {
    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    });

  //RET-5787
    test(
      'for respondent - verify only future hearings are shown in options',
      { tag: '@demo' },
      async ({
        page,
        caseListPage,
        listHearingPage,
        loginPage,
        caseDetailsPage,
        uploadDocumentsForHearingPage,
        checkYourAnswersPage,
        nocPage,
        manageCaseDashboardPage,
      }) => {
        //List 2 hearings for the case
        const hearingNumbers: number[] = [0, 1];
        for (const number of hearingNumbers) {
          await caseListPage.selectNextEvent('List Hearing');
          await listHearingPage.listCase('EnglandWales', number, 'Leeds ET');
          await caseDetailsPage.checkHasBeenCreated(Events.listHearing);
        }

        const date = DateUtilComponent.formatToDayMonthYear(DateUtilComponent.addWeekdays(new Date(), 21));
        await manageCaseDashboardPage.signOut();

        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etLegalRepresentative.email,
          config.etLegalRepresentative.password,
          config.loginPaths.cases,
        );
        await manageCaseDashboardPage.navigateToNoticeOfChange();
        await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);
        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

        await caseListPage.selectNextEvent(Events.uploadDocumentsForHearing.listItem);

        // //Verify only future hearings are shown in the options
        await uploadDocumentsForHearingPage.submitDocumentForHearing(
          {
            agreementOption: 'Yes',
            hearingOption: `1 Costs Hearing - Leeds ET - ${date}`,
            hearingList: [`1 Costs Hearing - Leeds ET - ${date}`],
            whoseDocuments: 'Respondent',
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
              { tabItem: `Whose hearing documents are you uploading?`, value: `Respondent's documents only` },
            ],
          },
        ]);
      },
    );
});
