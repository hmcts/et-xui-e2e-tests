import { cuiApi, test} from "../fixtures/common.fixture";
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { users } from '../config/config.dynamic.ts';

let caseNumber: string;
let caseId: string;

test.describe('Various tests for Citizen application', () => {

  test.use({
    storageState: users.etClaimant.sessionFile,
  })

  test.beforeEach(async () => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
  });

//RET-5415
  test('Citizen varifies legal representative details', async ({
    citizenHubPage, citizenHubLoginPage
  }) => {
    await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
    //claimant verify notification
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant verify legal rep's details
    await citizenHubPage.appointLegalRep(caseNumber, caseId);
  });
});

test.describe('Claimant navigate back to Case list', () => {
  test.use({
    storageState: users.etClaimant.sessionFile,
  })

  test('Claimant can navigate to Case list',
    async ({
             citizenHubPage,
             citizenHubLoginPage
  }) => {
    caseId = await CitizenClaimantFactory.createAndUpdateClaim(CaseTypeLocation.EnglandAndWales);
    await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);

  })
})
