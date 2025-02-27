import { test } from "../fixtures/common.fixture";
import dateUtilComponent from '../utils/DateUtilComponent';

const letterPageData = require('../data/ui-data/letter-content.json');

test.describe('Generate Letters', () => {

    test.beforeEach(async({ page, createCaseStep }) => {
        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('ET2 - Short track letter', async({caseListPage, listHearingPage, lettersPage}) => {
       
        await caseListPage.selectNextEvent(letterPageData.hearingEvent);
        await listHearingPage.listCase('EnglandWales', 1,false);

        await caseListPage.selectNextEvent(letterPageData.letterEvent);
        await lettersPage.generateShortTrackLetter();

        await caseListPage.verifyCaseDetailsOnTab(letterPageData.claimLabel, dateUtilComponent.formatTodaysDate(new Date()));
        await caseListPage.verifyCaseDetailsOnTab(letterPageData.et3DueDateLabel, dateUtilComponent.addDaysAndMonths(28));

        await caseListPage.navigateToTab("BF Actions");
        await caseListPage.verifyBFActionsTab('Description', 'Other action');
    });

});