import { test } from '../fixtures/common.fixture';
import { params } from '../utils/config';

const userDetailsData = require('../data/ui-data/user-details.json');


test.describe('Case creation in Citizen UI', () => {

  test('Create a claim for still working for organisation, submit and process within manage cases', {
    tag: ['@cx', '@smoke', '@ccd-callback-tests', '@nk']
  }, async ({ page, createCaseStep, respondentRepPage, citizenHubPage, caseListPage }) => {

    const submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processStillWorkingJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
    );

    const caseNumber = await createCaseStep.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETCaseWorkerUser,
      password: params.TestEnvETPassword
    });

    await caseListPage.selectNextEvent('Respondent Representative');
    await respondentRepPage.addRespondentRepresentative('registered', 'ET Organisation');
    await respondentRepPage.signoutButton();

    await citizenHubPage.processCitizenHubLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword);
    await citizenHubPage.clicksViewLinkOnClaimantApplicationPage(submissionReference);
    await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
    await citizenHubPage.regAccountContactTribunal('withdraw all or part of my claim');
    await citizenHubPage.rule92Question('yes');
    await citizenHubPage.cyaPageVerification();
  });

  test('Create a claim for working notice period for organisation, submit and process within manage cases', { tag: [ '@nk'] },
      async ({ page, createCaseStep }) => {
    const submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
    );

    await createCaseStep.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });


  test('Create a claim for no longer working for organisation, submit and process within manage cases',
        async ({ page, createCaseStep }) => {
    const submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processNoLongerWorkingForOrgJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
    );

    await createCaseStep.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });


  test('Create a claim for DID NOT work for organisation, submit and process within manage cases',
        async ({ page, createCaseStep }) => {
    const submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processDidNotWorkForOrganisationMakingClaimAgainst(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress)
    );

    await createCaseStep.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });


  test('Submit a case from Scotland - Case Progressing Claimant Submit application - record a decision as ECM',
        async ({ page, createCaseStep }) => {

    const submissionReference = await createCaseStep.createCaseViaCUI(page, 'Scotland',
      (loginPage) => loginPage.processLoginWithNewAccount(),
      (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processNoLongerWorkingForOrgJourney(userDetailsData.scotWorkPostcode, userDetailsData.scotSelectedWorkAddress, userDetailsData.scotFirstLineOfAddress)
    );

    await createCaseStep.setupCaseCreatedViaCUI(page, 'Scotland', submissionReference, {
      user: params.TestEnvETManageCaseUser,
      password: params.TestEnvETManageCasePassword
    });
  });

  test('Create a claim with multiple ACAS certificates, submit and process within manage cases',
      async ({ page, createCaseStep }) => {
        const submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
            (loginPage) => loginPage.processLoginWithNewAccount(),
            (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.multipleAcasCertificate(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
        );

      });
});


