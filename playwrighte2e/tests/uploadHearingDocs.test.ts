import { test } from '../fixtures/common.fixture';
import config from "../config/config";
import { Events } from '../config/case-data';
import DateUtilComponent from '../utils/DateUtilComponent';

let subRef: string;
let caseNumber: string;

test.describe('Upload hearing docs test', () => {
    test.beforeEach(async ({ page, createCaseStep }) => {
        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));
    });

  //RET-5787
    test('for respondent - verify only future hearings are shown in options', {tag: '@demo'},
      async ({
               page,
               caseListPage,
               listHearingPage,
               et1CaseServingPage,
               loginPage,
               legalRepPage,
               caseDetailsPage,
               uploadDocumentsForHearingPage,
               checkYourAnswersPage
             }) => {

        //Retrieve claimant's first name and last name for NoC
        const { firstName, lastName } = await et1CaseServingPage.getClaimantFirstName();

        //List 2 hearings for the case
        const hearingNumbers: number[] = [0, 1];
        for(const number of hearingNumbers) {
          await caseListPage.selectNextEvent('List Hearing');
          await listHearingPage.listCase('EnglandWales', number, 'Leeds ET');
          await caseDetailsPage.checkHasBeenCreated(Events.listHearing)
        }

        const date = DateUtilComponent.formatToDayMonthYear(DateUtilComponent.addWeekdays(new Date(), 21));
        await page.click('text=Sign out');
        await page.goto(config.TestUrlForManageCaseAAT);
        await loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, 'cases');
        await legalRepPage.processNOCForClaimantOrRespondent('Eng/Wales - Singles', subRef, caseNumber, firstName, lastName, false, true);

        await caseListPage.navigateToCaseDetails(subRef, 'EnglandWales')
        await caseListPage.selectNextEvent(Events.uploadDocumentsForHearing.listItem);

        // //Verify only future hearings are shown in the options
        await uploadDocumentsForHearingPage.submitDocumentForHearing(
          {
            agreementOption: 'Yes',
            hearingOption: `1 Costs Hearing - Leeds ET - ${date}`,
            hearingList: [`1 Costs Hearing - Leeds ET - ${date}`],
            whoseDocuments: 'Respondent',
            documentType: 'Witness statement only',
          }, checkYourAnswersPage
        )
        await caseDetailsPage.checkHasBeenCreated(Events.uploadDocumentsForHearing)

        await caseDetailsPage.assertTabData([
          {
            tabName: 'Hearing Documents',
            tabContent: [
              `Respondent Hearing Documents`,
              { tabItem: `Hearing`, value: `Uploaded date | Document` },
              { tabItem: `1 Costs Hearing - Leeds ET - ${date}`, value: `${DateUtilComponent.getUtcDateTimeFormatted()} | welshTest.pdf`, clickable: true, exact: false },
              { tabItem:`Have you agreed these documents with the other party?`, value: `Yes` },
              { tabItem: `Type`, value: `Witness statements only`},
              { tabItem: `Whose hearing documents are you uploading?`, value: `Respondent's documents only` }
              ]
          }
        ]);
    });
});
