import { test } from "../fixtures/common.fixture";
import dateUtilComponent from '../data-utils/DateUtilComponent';
import { Events } from '../config/case-data';

const letterPageData = require('../data/ui-data/letter-content.json');

test.describe('Generate Letters', () => {

    test.beforeEach(async({ page, createCaseStep }) => {
        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
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
