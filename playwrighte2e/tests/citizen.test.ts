import {test} from "../fixtures/common.fixture";
import CaseWorkerNotificationPage from "../pages/notifications/caseWorkerNotificationPage.ts";
import config from "../config/config";

let caseNumber: string;
let subRef: string;

test.beforeEach(async ({ page, createCaseStep, axeUtils}) => {
  ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true, axeUtils));
});

test.describe('Various tests for Citizen application', () => {

//RET-5415
  test.skip('Citizen varifies legal representative details', async ({ page, citizenHubPage, caseListPage }) => {
    let notificationPage = new CaseWorkerNotificationPage(page);
    await caseListPage.signoutButton();

    //claimant verify notification
    await citizenHubPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant verify legal rep's details
    await citizenHubPage.appointLegalRep();
  });
});
