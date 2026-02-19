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

export async function vetAndAcceptCitizenCase(
  page: Page,
  loginPage: LoginPage,
  caseListPage: CaseListPage,
  et1VettingPage: Et1VettingPages,
  et1CaseServingPage: Et1CaseServingPage,
  region: string,
  submissionReference: string,
  loginCredentials: { user: string; password: string, path: string },
) {
  await page.goto(config.manageCaseBaseUrl);
  await loginPage.processLogin(loginCredentials.user, loginCredentials.password, loginCredentials.path);
  const searchReference = region === 'England' ? 'EnglandWales' : region;
  let caseNumber = await caseListPage.navigateToCaseDetails(submissionReference, searchReference);
  await caseListPage.verifyCaseDetailsPage(true);

  await caseListPage.selectNextEvent('ET1 case vetting');
  await et1VettingPage.processET1CaseVettingPages();
  await caseListPage.verifyCaseDetailsPage(false);
  await caseListPage.selectNextEvent('Accept/Reject Case');
  await et1CaseServingPage.processET1CaseServingPages();

  return caseNumber;
}
