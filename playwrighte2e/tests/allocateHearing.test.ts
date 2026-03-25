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
                                                                 loginPage,
                                                                 listHearingPage,
                                                                 caseDetailsPage,allocateHearingPAge
                                                               }) => {
    await manageCaseDashboardPage.visit();
    //judge log in
    await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
    caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

    //List 1 hearing for the case
    await caseDetailsPage.selectNextEvent(Events.listHearing);
    await listHearingPage.listCase('EnglandWales', 0, 'Newcastle CFCTC', "Costs Hearing", "Full Panel");
    await caseDetailsPage.checkHasBeenCreated(Events.listHearing);
    await caseDetailsPage.selectNextEvent(Events.allocateHearing);
    await allocateHearingPAge.allocateHearing();
    await caseDetailsPage.selectNextEvent(Events.listHearing);
    await listHearingPage.updatePanelType("Sit Alone");
    // RET-5464
    await caseDetailsPage.selectNextEvent(Events.printHearingLists);
    await allocateHearingPAge.validateHearingList();
  });
});
