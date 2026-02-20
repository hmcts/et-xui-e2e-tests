import { test } from "../fixtures/common.fixture";
import dateUtilComponent from '../data-utils/DateUtilComponent';
import { CaseTypeLocation, Events } from '../config/case-data';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';

const letterPageData = require('../resources/payload/letter-content.json');
let caseNumber: string;
let caseId: string;
test.describe('Generate Letters', () => {

    test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);

      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    });

    test('ET2 - Short track letter', {tag: '@demo'}, async({caseListPage, listHearingPage, lettersPage}) => {

        await caseListPage.selectNextEvent(Events.listHearing.listItem);
        await listHearingPage.listCase('EnglandWales', 0,'Leeds ET');

        await caseListPage.selectNextEvent(letterPageData.letterEvent);
        await lettersPage.generateShortTrackLetter();

        await caseListPage.verifyCaseDetailsOnTab(letterPageData.claimLabel, dateUtilComponent.formatTodaysDate(new Date()));
        await caseListPage.verifyCaseDetailsOnTab(letterPageData.et3DueDateLabel, dateUtilComponent.addDaysAndMonths(28));

        await caseListPage.navigateToTab("BF Actions");
        await caseListPage.verifyBFActionsTab('Description', 'Other action');
    });

});
