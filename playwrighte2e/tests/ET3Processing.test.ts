import { test } from '../fixtures/common.fixture';

const letterPageData = require('../data/ui-data/letter-content.json');

test.describe('ET3 Process test', () => {

    test.beforeEach(async ({ page, createCaseStep }) => {

        await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales");
    });

    test('England - processing an ET3 response', async ({ caseListPage, lettersPage, et3ProcessingSteps }) => {

        await caseListPage.selectNextEvent(letterPageData.letterEvent);
        await lettersPage.generateNoHearingDateLetter();

        await caseListPage.selectNextEvent('Respondent Details');
        await et3ProcessingSteps.fillET3Values();

        await caseListPage.selectNextEvent('ET3 Processing');
        await et3ProcessingSteps.processET3();

        await caseListPage.navigateToTab('Respondent');
        await caseListPage.verifyET3DetailsOnRespondentTab();
    });
});
