import {test} from "../fixtures/common.fixture";
import createAndAcceptCase from "../steps/createAndAcceptCase";
import NotificationPage from "../pages/notificationPage";
import {params} from "../utils/config";

let caseNumber: any;
let subRef;

test.beforeEach(async ({ page, createCaseStep}) => {
  ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true));
});


test.describe('Various tests for Citizen application', () => {

//RET-5415
  test.skip('Citizen varifies legal representative details', async ({ page, citizenHubPage, caseListPage }) => {
    let notificationPage = new NotificationPage(page);
    await caseListPage.signoutButton();

    //claimant verify notification
    await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant verify legal rep's details
    await citizenHubPage.appointLegalRep();
  });
});