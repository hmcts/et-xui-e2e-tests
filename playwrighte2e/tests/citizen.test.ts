import { cuiApi, test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { users } from '../config/config.dynamic.ts';

test.describe('Claimant navigate back to Case list', () => {
  let caseNumber: string;
  let caseId: string;

  test.use({
    storageState: users.etClaimant.sessionFile,
  })

  test('Claimant can navigate to Case list and Citizen varifies legal representative details',
    async ({ page,
             citizenHubPage,
             citizenHubLoginPage,
              et1ClaimsListPage
  }) => {
    const caseId = await CitizenClaimantFactory.createAndUpdateClaim(CaseTypeLocation.EnglandAndWales);
    let caseNumber: string;
    await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
    await et1ClaimsListPage.continueToCaseFromDraftClaimsTable(caseId);
    await et1ClaimsListPage.clickMyEt1ClaimLink();
    await et1ClaimsListPage.assertCaseListedInDraftClaims(caseId);

    await cuiApi.submitDraftCuiCase(users.etClaimant.email, users.etClaimant.password, caseId, CaseTypeLocation.EnglandAndWales);

    await citizenHubLoginPage.processCitizenHubLogin(users.etClaimant);
    await et1ClaimsListPage.navigateToCaseFromSubmittedClaimsTable(caseId);
    await et1ClaimsListPage.clickMyEt1ClaimLink();
    caseNumber = await et1ClaimsListPage.navigateToCaseFromSubmittedClaimsTable(caseId);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);

    //claimant verify legal rep's details
    await citizenHubPage.appointLegalRep(caseNumber, caseId);
  })
})
