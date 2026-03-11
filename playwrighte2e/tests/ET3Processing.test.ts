import { test } from '../fixtures/common.fixture';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';
import { CaseTypeLocation } from '../config/case-data.ts';

const letterPageData = require('../resources/payload/letter-content.json');
let caseId: string;
let caseNumber: string;

test.describe('ET3 Process test', () => {

    test.beforeEach(async () => {
      ({caseId, caseNumber} = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
    });

    test(
      'England - processing an ET3 response',
      { tag: '@demo' },
      async ({ manageCaseDashboardPage, loginPage, caseListPage, lettersPage, et3ProcessPage, respondentRepPage }) => {
        await manageCaseDashboardPage.visit();
        await loginPage.processLogin(
          config.etCaseWorker.email,
          config.etCaseWorker.password,
          config.loginPaths.worklist,
        );

        await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
        await caseListPage.selectNextEvent(letterPageData.letterEvent);
        await lettersPage.generateNoHearingDateLetter();

        await caseListPage.selectNextEvent('Respondent Details');
        await respondentRepPage.enterRespType();

        await caseListPage.selectNextEvent('ET3 Processing');
        await et3ProcessPage.submitET3Response();

        await caseListPage.navigateToTab('Respondents');
        await caseListPage.verifyET3DetailsOnRespondentTab();
      },
    );
});
