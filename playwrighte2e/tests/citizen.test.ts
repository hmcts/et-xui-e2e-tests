import {test} from "../fixtures/common.fixture";
import config from "../config/config";
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';

let caseNumber: string;
let caseId: string;

test.beforeEach(async () => {
  caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
  ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
});

test.describe('Various tests for Citizen application', () => {

//RET-5415
  test('Citizen varifies legal representative details', async ({
    citizenHubLoginPage,
    citizenHubPage,
  }) => {
    //claimant verify notification
    await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
    await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant verify legal rep's details
    await citizenHubPage.appointLegalRep(caseNumber, caseId);
  });
});
