import {test} from "../fixtures/common.fixture";
import config from "../config/config";

let caseNumber: string;
let subRef: string;

test.beforeEach(async ({ page, createCaseStep, axeUtils}) => {
  ({subRef, caseNumber} = await createCaseStep.setupCUICaseCreatedViaApi(page, true, true, axeUtils));
});

test.describe('Various tests for Citizen application', () => {

//RET-5415
  test('Citizen varifies legal representative details', async ({citizenHubLoginPage, citizenHubPage, caseListPage }) => {

    await caseListPage.signoutButton();

    //claimant verify notification
    await citizenHubLoginPage.processCitizenHubLogin(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(subRef);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant verify legal rep's details
    await citizenHubPage.appointLegalRep(caseNumber, subRef);
  });
});
