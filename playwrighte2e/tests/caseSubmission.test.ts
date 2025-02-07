import { test } from '@playwright/test';
import { params } from '../utils/config';
import CaseListPage from "../pages/caseListPage";
import RespondentRepPage from "../pages/respondentRepPage";
import CitizenHubPage from "../pages/citizenHubPage";
import createAndAcceptCase from "../pages/createAndAcceptCase";

const userDetailsData = require('../data/ui-data/user-details.json');


test.describe('Case creation in manage case application', () => {
  let createCase = new createAndAcceptCase();

  test('Create a claim for still working for organisation, submit and process within manage cases', {
    tag: ['@cx', '@smoke']
  }, async ({ page }) => {

    const submissionReference = await createCase.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processStillWorkingJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
    );

    const caseNumber = await createCase.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETCaseWorkerUser,
      password: params.TestEnvETPassword
    });

    const respondentRepPage = new RespondentRepPage(page);
    const citizenHubPages = new CitizenHubPage(page);
    const caseListPage = new CaseListPage(page);

    await caseListPage.selectNextEvent('Respondent Representative');
    await respondentRepPage.addRespondentRepresentative('registered', 'ET Organisation');
    await respondentRepPage.signoutButton();

    await citizenHubPages.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPages.clicksViewLinkOnClaimantApplicationPage(submissionReference);
    await citizenHubPages.verifyCitizenHubCaseOverviewPage(caseNumber);
    await citizenHubPages.regAccountContactTribunal('withdraw all or part of my claim');
    await citizenHubPages.rule92Question('yes');
    await citizenHubPages.cyaPageVerification();
  });

  test('Create a claim for working notice period for organisation, submit and process within manage cases', async ({ page }) => {
    const submissionReference = await createCase.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
    );

    await createCase.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });


  test('Create a claim for no longer working for organisation, submit and process within manage cases', async ({ page }) => {
    const submissionReference = await createCase.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processNoLongerWorkingForOrgJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
    );

    await createCase.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });
  

  test('Create a claim for DID NOT work for organisation, submit and process within manage cases', async ({ page }) => {
    const submissionReference = await createCase.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processDidNotWorkForOrganisationMakingClaimAgainst(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress)
    );

    await createCase.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });
  

  test('Submit a case from Scotland - Case Progressing Claimant Submit application - record a decision as ECM', async ({ page }) => {

    const submissionReference = await createCase.createCaseViaCUI(page, 'Scotland',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processNoLongerWorkingForOrgJourney(userDetailsData.scotWorkPostcode, userDetailsData.scotSelectedWorkAddress, userDetailsData.scotFirstLineOfAddress)
    );

    await createCase.setupCaseCreatedViaCUI(page, 'Scotland', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });

});


