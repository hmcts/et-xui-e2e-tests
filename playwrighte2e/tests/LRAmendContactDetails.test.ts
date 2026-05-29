import { test } from '../fixtures/common.fixture.ts';
import { users } from '../config/config.dynamic.ts';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import { AddressDetails } from '../types/address.ts';
import LoginPage from '../pages/loginPage.ts';
import { ManageCaseDashboardPage } from '../pages/ManageCaseDashboardPage.ts';
import { Page } from '@playwright/test';
import CaseDetailsPage from '../pages/caseDetailsPage.ts';

let caseId: string;
let caseNumber: string;

test.describe( 'Legal Rep updates update contact to colleagues in his org', () => {
  let caseWorkerBrowserPage: Page;
  let loginPageCW: LoginPage;
  let manageCaseDashboardPageCW: ManageCaseDashboardPage;
  let caseDetailsPageCW: CaseDetailsPage;

  test.use({
    storageState: users.etLegalRepresentative.sessionFile,
  })

  test.beforeEach(async ({manageCaseDashboardPage, loginPage, browserUtils}) => {
    caseId = await CitizenClaimantFactory.createAndSubmitClaim(CaseTypeLocation.EnglandAndWales);
    ({caseId, caseNumber} = await CaseEventApi.caseWorkerDoesEt1VettingAndAcceptCaseEngland(caseId));
    await manageCaseDashboardPage.visit();
    await loginPage.processLogin(users.etLegalRepresentative);

    caseWorkerBrowserPage = await browserUtils.openNewBrowserContext(users.etCaseWorker.sessionFile);
    loginPageCW = new LoginPage(caseWorkerBrowserPage);
    manageCaseDashboardPageCW = new ManageCaseDashboardPage(caseWorkerBrowserPage);
    caseDetailsPageCW = new CaseDetailsPage(caseWorkerBrowserPage);
  })

  test('Claimant Legal Rep updates contact to colleagues in his org',
    async ({
      nocPage, manageCaseDashboardPage, caseDetailsPage, amendContactDetailsLrPage, checkYourAnswersPage,
      browserUtils
   }) => {
    // LR takes the case by NOC
    await manageCaseDashboardPage.navigateToNoticeOfChange();
    await nocPage.processNocRequest(caseId, `${CaseDetailsValues.claimantFirstName} ${CaseDetailsValues.claimantLastName}`, caseNumber);

    // LR amends the contact details by 'Amend contact details'
    await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPage.selectNextEvent(Events.amendContactDetailsClaimant);
    let addressDetails: AddressDetails;
    let phNumber: string;
    ({ addressDetails, phNumber} = await amendContactDetailsLrPage.amendLegalRepContactDetails('Amend contact details', checkYourAnswersPage));
    const tabData = [
      {
        tabName: 'Claimant Representative',
        tabContent: [
          { tabItem: 'Phone number', value: phNumber },
          { tabItem: 'Building and Street', value: addressDetails.addressLine1 },
          { tabItem: 'Town or City', value: addressDetails.townOrCity },
          { tabItem: 'Postcode/Zipcode', value: addressDetails.postcode },
        ]
      }
    ];
    await caseDetailsPage.assertTabData(tabData);

    // login as Caseworker check the detail updated
    await manageCaseDashboardPageCW.visit();
    await loginPageCW.processLogin(users.etCaseWorker);
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.assertTabData(tabData);

// LR updates contact details by 'Use MyHMCTS details'
    await caseDetailsPage.selectNextEvent(Events.amendContactDetailsClaimant);
    ({ addressDetails,  phNumber} = await amendContactDetailsLrPage.amendLegalRepContactDetails('Use MyHMCTS details', checkYourAnswersPage));
    const updatedTabData = [
      {
        tabName: 'Claimant Representative',
        tabContent: [
          { tabItem: 'Building and Street', value: addressDetails.addressLine1 },
          { tabItem: 'Town or City', value: addressDetails.townOrCity },
          { tabItem: 'Postcode/Zipcode', value: addressDetails.postcode },
        ]
      }
    ];
    await caseDetailsPage.assertTabData(updatedTabData);

    // login as Caseworker check the detail updated
    await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
    await caseDetailsPageCW.assertTabData(updatedTabData);
    await caseWorkerBrowserPage.close();
  });

  //RET-6237 to be released before testing this for Respondent LR
  test.skip('Respondent Legal Rep updates contact to colleagues in his org',
    async ({
             nocPage, manageCaseDashboardPage, caseDetailsPage, amendContactDetailsLrPage, checkYourAnswersPage
           }) => {
      await manageCaseDashboardPage.navigateToNoticeOfChange();
      await nocPage.processNocRequest(caseId, CaseDetailsValues.respondentName, caseNumber);

      await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseDetailsPage.selectNextEvent(Events.amendContactDetails);
      let addressDetails: AddressDetails;
      let phNumber: string;
      ({ addressDetails, phNumber} = await amendContactDetailsLrPage.amendLegalRepContactDetails('Amend contact details', checkYourAnswersPage));
      const tabData = [
        {
          tabName: 'Respondent Representative',
          tabContent: [
            { tabItem: 'Phone number', value: phNumber },
            { tabItem: 'Building and Street', value: addressDetails.addressLine1 },
            { tabItem: 'Town or City', value: addressDetails?.townOrCity },
            { tabItem: 'Postcode/Zipcode', value: addressDetails?.postcode },
          ]
        }
      ];
      await caseDetailsPage.assertTabData(tabData);

      // login as Caseworker check the detail updated
      await manageCaseDashboardPageCW.visit();
      await loginPageCW.processLogin(users.etCaseWorker);
      await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseDetailsPageCW.assertTabData(tabData);

      await caseDetailsPage.selectNextEvent(Events.amendContactDetails);
      ({ addressDetails,  phNumber} = await amendContactDetailsLrPage.amendLegalRepContactDetails('Use MyHMCTS details', checkYourAnswersPage));
      const updatedTabData = [
        {
          tabName: 'Respondent Representative',
          tabContent: [
            { tabItem: 'Building and Street', value: addressDetails.addressLine1 },
            { tabItem: 'Town or City', value: addressDetails?.townOrCity },
            { tabItem: 'Postcode/Zipcode', value: addressDetails?.postcode },
          ]
        }
      ];
      await caseDetailsPage.assertTabData(updatedTabData);

      // login as Caseworker check the detail updated
      await manageCaseDashboardPageCW.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);
      await caseDetailsPageCW.assertTabData(updatedTabData);
      await caseWorkerBrowserPage.close();
    });
});
