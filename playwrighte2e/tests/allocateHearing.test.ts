import { test } from '../fixtures/common.fixture';
import { CaseTypeLocation, Events } from '../config/case-data';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import config from '../config/config.ts';

let caseId: string;
let caseNumber: string;

test.describe('Allocate Hearing and Hearing List', () => {
  test.beforeEach(async () => {
    ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
  });

  test('Print Hearing List for Newcastle office and validate members', { tag: '@demo' },async ({
                                                                 manageCaseDashboardPage,
                                                                 loginPage, caseListPage,
                                                                 listHearingPage,
                                                                 caseDetailsPage,allocateHearingPAge
                                                               }) => {
    await manageCaseDashboardPage.visit();
    //judge log in
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //List 1 hearing for the case
    await caseListPage.selectNextEvent(Events.listHearing.listItem);
    await listHearingPage.listCase('EnglandWales', 0, 'Newcastle CFCTC', "Costs Hearing", "Full Panel");
    await caseDetailsPage.checkHasBeenCreated(Events.listHearing);
    await caseListPage.selectNextEvent('Allocate Hearing');
    await allocateHearingPAge.allocateHearing();
    await caseListPage.selectNextEvent(Events.listHearing.listItem);
    await listHearingPage.updatePanelType("Sit Alone");
    // RET-5464
    await caseListPage.selectNextEvent('Print Hearing lists');
    await allocateHearingPAge.validateHearingList();
  });
});
