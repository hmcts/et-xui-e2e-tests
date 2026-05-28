import { test } from '../fixtures/common.fixture.ts';
import { users } from '../config/config.dynamic.ts';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { AddressDetails } from '../types/address.ts';

let caseId: string;
let caseNumber: string;

test.describe( 'Legal Rep updates update contact to colleagues in his org', () => {
  test.use({
    storageState: users.etLegalRepresentative.sessionFile,
  })

  test.beforeEach(async ({manageCaseDashboardPage, loginPage}) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etLegalRepresentative);
  })

  test('Claimant Legal Rep updates contact to colleagues in his org',
    async ({
      nocPage, manageCaseDashboardPage, caseDetailsPage, amendContactDetailsLrPage, checkYourAnswersPage
   }) => {
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(caseId, `${CaseDetailsValues.claimantFirstName} ${CaseDetailsValues.claimantLastName}`, caseNumber);

      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseDetailsPage.selectNextEvent(Events.amendContactDetailsClaimant);
      let addressDetails: AddressDetails;
      let phNumber: string;
      ({ addressDetails, phNumber} = await amendContactDetailsLrPage.amendLegalRepContactDetails('Amend contact details', checkYourAnswersPage));
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Claimant Representative',
          tabContent: [
            { tabItem: 'Phone number', value: phNumber },
            { tabItem: 'Building and Street', value: addressDetails.addressLine1 },
            { tabItem: 'Town or City', value: addressDetails?.townOrCity },
            { tabItem: 'Postcode/Zipcode', value: addressDetails?.postcode },
          ]
        }
      ]);

      await caseDetailsPage.selectNextEvent(Events.amendContactDetailsClaimant);
      ({ addressDetails,  phNumber} = await amendContactDetailsLrPage.amendLegalRepContactDetails('Use MyHMCTS details', checkYourAnswersPage));
      await caseDetailsPage.assertTabData([
        {
          tabName: 'Claimant Representative',
          tabContent: [
            { tabItem: 'Building and Street', value: addressDetails.addressLine1 },
            { tabItem: 'Town or City', value: addressDetails?.townOrCity },
            { tabItem: 'Postcode/Zipcode', value: addressDetails?.postcode },
          ]
        }
      ]);
  });
});
