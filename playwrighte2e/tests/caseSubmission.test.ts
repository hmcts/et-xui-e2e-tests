import { test } from '../fixtures/common.fixture';
import config from '../config/config';
import userDetailsData from '../resources/payload/user-details.json';
import { createCaseViaCitizenUI, vetAndAcceptCitizenCase } from '../pages/helpers/CuiCaseCreationHelper.ts';

test.describe('Case creation in Citizen UI', () => {

  test(
    'Create a claim for still working for organisation, submit and process within manage cases',
    {
      tag: ['@cx', '@smoke', '@ccd-callback-tests'],
    },
    async ({
      page,
      respondentRepPage,
      citizenHubLoginPage,
      citizenHubPage,
      caseListPage,
      contactTheTribunalPage,
      loginPage,
      et1VettingPage,
      et1CaseServingPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
    }) => {
      const submissionReference = await createCaseViaCitizenUI(
        page,
        loginPage,
        citizenPreLoginPage,
        citizenPostLoginPage,
        personalDetailsPage,
        employmentAndRespondentDetailsPage,
        claimDetailsPage,
        submitClaimPage,
        'EnglandWales',
        loginPage => loginPage.processLoginCitizenUi(config.etClaimant.email, config.etClaimant.password),
        employmentAndRespondentDetailsPage =>
          employmentAndRespondentDetailsPage.processStillWorkingJourney(
            userDetailsData.workPostcode,
            userDetailsData.selectedWorkAddress,
            userDetailsData.firstLineOfAddress,
          ),
      );

      const caseNumber = await vetAndAcceptCitizenCase(
        page,
        loginPage,
        caseListPage,
        et1VettingPage,
        et1CaseServingPage,
        'EnglandWales',
        submissionReference,
        {
          user: config.etCaseWorker.email,
          password: config.etCaseWorker.password,
          path: config.loginPaths.worklist,
        },
      );

      await caseListPage.selectNextEvent('Respondent Representative');
      await respondentRepPage.addRespondentRepresentative('registered', 'ET Organisation');
      await respondentRepPage.signoutButton();

      await citizenHubLoginPage.processCitizenHubLogin(config.etClaimant.email, config.etClaimant.password);
      await citizenHubPage.navigateToSubmittedCaseOverviewOfClaimant(submissionReference);
      await citizenHubPage.citizenHubCaseOverviewPage(caseNumber);
      await citizenHubPage.navigateToContactTheTribunalPage();
      await contactTheTribunalPage.makeApplicationToTribunal('withdraw', 'Citizen withdrawing an application', 'Yes');
      await contactTheTribunalPage.clickSubmitButton();
      await contactTheTribunalPage.assertApplicationSentSuccessPageIsDisplayed();
      await contactTheTribunalPage.clickCloseAndReturn();
    },
  );

  test('Create a claim for working notice period for organisation, submit and process within manage cases',
    async ({
      page,
      loginPage,
      caseListPage,
      et1VettingPage,
      et1CaseServingPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
  }) => {
    const submissionReference = await createCaseViaCitizenUI(
      page,
      loginPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
      'EnglandWales',
      loginPage => loginPage.processLoginWithNewAccount(),
      employmentAndRespondentDetailsPage =>
        employmentAndRespondentDetailsPage.processWorkingNoticePeriodJourney(
          userDetailsData.workPostcode,
          userDetailsData.selectedWorkAddress,
          userDetailsData.firstLineOfAddress,
        ),
    );

      await vetAndAcceptCitizenCase(
        page,
        loginPage,
        caseListPage,
        et1VettingPage,
        et1CaseServingPage,
        'EnglandWales',
        submissionReference,
        {
          user: config.etManageCaseUser.email,
          password: config.etManageCaseUser.password,
          path: config.loginPaths.worklist,
        },
      );
  });

  test('Create a claim for no longer working for organisation, submit and process within manage cases',
    async ({
      page,
      loginPage,
      caseListPage,
      et1VettingPage,
      et1CaseServingPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
  }) => {
    const submissionReference = await createCaseViaCitizenUI(
      page,
      loginPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
      'EnglandWales',
      loginPage => loginPage.processLoginWithNewAccount(),
      employmentAndRespondentDetailsPage =>
        employmentAndRespondentDetailsPage.processNoLongerWorkingForOrgJourney(
          userDetailsData.workPostcode,
          userDetailsData.selectedWorkAddress,
          userDetailsData.firstLineOfAddress,
        ),
    );

      await vetAndAcceptCitizenCase(
        page,
        loginPage,
        caseListPage,
        et1VettingPage,
        et1CaseServingPage,
        'EnglandWales',
        submissionReference,
        {
          user: config.etManageCaseUser.email,
          password: config.etManageCaseUser.password,
          path: config.loginPaths.worklist,
        },
      );
  });

  test('Create a claim for DID NOT work for organisation, submit and process within manage cases', async ({
    page,
    loginPage,
    caseListPage,
    et1VettingPage,
    et1CaseServingPage,
    citizenPreLoginPage,
    citizenPostLoginPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
  }) => {
    const submissionReference = await createCaseViaCitizenUI(
      page,
      loginPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
      'EnglandWales',
      loginPage => loginPage.processLoginWithNewAccount(),
      employmentAndRespondentDetailsPage =>
        employmentAndRespondentDetailsPage.processDidNotWorkForOrganisationMakingClaimAgainst(
          userDetailsData.workPostcode,
          userDetailsData.selectedWorkAddress,
        ),
    );

    await vetAndAcceptCitizenCase(
      page,
      loginPage,
      caseListPage,
      et1VettingPage,
      et1CaseServingPage,
      'EnglandWales',
      submissionReference,
      {
        user: config.etManageCaseUser.email,
        password: config.etManageCaseUser.password,
        path: config.loginPaths.worklist,
      },
    );
  });

  test('Submit a case from Scotland - Case Progressing Claimant Submit application - record a decision as ECM', async ({
    page,
    loginPage,
    caseListPage,
    et1VettingPage,
    et1CaseServingPage,
    citizenPreLoginPage,
    citizenPostLoginPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
  }) => {
    const submissionReference = await createCaseViaCitizenUI(
      page,
      loginPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
      'Scotland',
      loginPage => loginPage.processLoginWithNewAccount(),
      employmentAndRespondentDetailsPage =>
        employmentAndRespondentDetailsPage.processNoLongerWorkingForOrgJourney(
          userDetailsData.scotWorkPostcode,
          userDetailsData.scotSelectedWorkAddress,
          userDetailsData.scotFirstLineOfAddress,
        ),
    );

    await vetAndAcceptCitizenCase(
      page,
      loginPage,
      caseListPage,
      et1VettingPage,
      et1CaseServingPage,
      'Scotland',
      submissionReference,
      {
        user: config.etManageCaseUser.email,
        password: config.etManageCaseUser.password,
        path: config.loginPaths.worklist,
      },
    );
  });

  test('Create a claim with multiple ACAS certificates, submit and process within manage cases', async ({
    page,
    loginPage,
    citizenPreLoginPage,
    citizenPostLoginPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
  }) => {
    const submissionReference = await createCaseViaCitizenUI(
      page,
      loginPage,
      citizenPreLoginPage,
      citizenPostLoginPage,
      personalDetailsPage,
      employmentAndRespondentDetailsPage,
      claimDetailsPage,
      submitClaimPage,
      'EnglandWales',
      loginPage => loginPage.processLoginWithNewAccount(),
      employmentAndRespondentDetailsPage =>
        employmentAndRespondentDetailsPage.multipleAcasCertificate(
          userDetailsData.workPostcode,
          userDetailsData.selectedWorkAddress,
          userDetailsData.firstLineOfAddress,
        ),
    );
  });
});
