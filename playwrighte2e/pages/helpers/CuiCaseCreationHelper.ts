import { Page } from '@playwright/test';
import config from '../../config/config.ts';
import CUIPreLoginPage from '../claimantCitizenHub/CUIPreLoginPage.ts';
import CUIPostLoginPages from '../claimantCitizenHub/CUIPostLoginPages.ts';
import PersonalDetailsPage from '../claimantCitizenHub/personalDetailsPage.ts';
import EmploymentAndRespDetailsPage from '../claimantCitizenHub/employmentAndRespDetailsPage.ts';
import ClaimDetailsPage from '../claimantCitizenHub/claimDetailsPage.ts';
import SubmitClaimPage from '../claimantCitizenHub/submitClaimPage.ts';

import userDetailsData from '../../resources/payload/user-details.json';
import LoginPage from '../loginPage.ts';
import CaseListPage from '../caseListPage.ts';
import Et1VettingPages from '../et1VettingPages.ts';
import Et1CaseServingPage from '../et1CaseServingPage.ts';
import { ManageCaseDashboardPage } from '../ManageCaseDashboardPage.ts';
import { CaseDetailsValues, CaseTypeLocation, Events } from '../../config/case-data.ts';
import CaseDetailsPage from '../caseDetailsPage.ts';

export async function createCaseViaCitizenUI(
  page: Page,
  loginPage: LoginPage,
  citizenPreLoginPage: CUIPreLoginPage,
  citizenPostLoginPage: CUIPostLoginPages,
  personalDetailsPage: PersonalDetailsPage,
  employmentAndRespondentDetailsPage: EmploymentAndRespDetailsPage,
  claimDetailsPage: ClaimDetailsPage,
  submitClaimPage: SubmitClaimPage,
  region: string,
  loginMethod: (page: any) => Promise<void>,
  employmentJourneyMethod?: (page: any) => Promise<void>,
) {
  await page.goto(config.etSyaUiUrl);
  await citizenPreLoginPage.processPreLoginPagesForTheDraftApplication(region);
  await loginMethod(loginPage);
  await citizenPostLoginPage.processPostLoginPagesForTheDraftApplication();
  const location = region === 'EnglandWales' ? 'England' : region;
  await personalDetailsPage.processPersonalDetails(userDetailsData.postcode, location, userDetailsData.addressOption);
  if (employmentJourneyMethod) await employmentJourneyMethod(employmentAndRespondentDetailsPage);
  await claimDetailsPage.processClaimDetails();
  const submissionReference = await submitClaimPage.submitClaim();
  await submitClaimPage.signoutButton();
  return submissionReference;
}

async function assertTabData(caseDetailsPage: CaseDetailsPage) {
  await caseDetailsPage.assertTabData([
    {
      tabName: 'Case Details',
      tabContent: [
        { tabItem: 'Claimant', value: `${CaseDetailsValues.claimantFirstName} ${CaseDetailsValues.claimantLastName}` },
        { tabItem: 'Respondent', value: `${CaseDetailsValues.respondentName}` }
      ]
    },
    {
      tabName: 'Claimant',
      tabContent: [
        'Claimant Details'
      ]
    },
    {
      tabName: 'Respondent',
      tabContent: [
        { tabItem: CaseDetailsValues.claimantLastName, value: 'Yes', clickable: true },
      ]
    },
    {
      tabName: 'Jurisdictions',
      tabContent: [
        { tabItem: 'Jurisdiction Code', value: 'DAG' },
        'Discrimination, including harassment or discrimination based on association or perception on grounds of age'
      ]
    },
    {
      tabName: 'Referrals',
      tabContent: [
        'Send a new referral',
        'Update a referral',
        'Reply to a referral',
        'Close a referral'
      ]
    },
    {
      tabName: 'History',
      tabContent: [
        'Create Case'
      ]
    },
    {
      tabName: 'Documents',
      tabContent: [
        'Case documentation',
      ]
    },
    {
      tabName: 'ET1 Vetting',
      tabContent: [
        {
          tabItem: 'ET1 Vetting Document',
          value: `ET1 Vetting - ${CaseDetailsValues.claimantFirstName} ${CaseDetailsValues.claimantLastName}.pdf`
        },
        { tabItem: 'Vetting completed by', value: 'Employment Service' }
      ]
    }

  ])
}

export async function vetAndAcceptCitizenCase(
  loginPage: LoginPage,
  et1VettingPage: Et1VettingPages,
  et1CaseServingPage: Et1CaseServingPage,
  manageCaseDashboardPage: ManageCaseDashboardPage,
  caseDetailsPage: CaseDetailsPage,
  caseTypeLocation: CaseTypeLocation,
  submissionReference: string,
  loginCredentials: { user: string; password: string, path: string },
) {
  await manageCaseDashboardPage.visit();
  await loginPage.processLogin(loginCredentials.user, loginCredentials.password, loginCredentials.path);
  let caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(submissionReference,caseTypeLocation)
  await assertTabData(caseDetailsPage);

  await caseDetailsPage.selectNextEvent(Events.et1Vetting);
  await et1VettingPage.processET1CaseVettingPages();
  await assertTabData(caseDetailsPage);
  await caseDetailsPage.selectNextEvent(Events.acceptRejectCase);
  await et1CaseServingPage.processET1CaseServingPages();

  return caseNumber;
}
