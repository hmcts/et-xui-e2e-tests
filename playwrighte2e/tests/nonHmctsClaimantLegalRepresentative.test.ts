import { test } from '../fixtures/common.fixture';
import { CaseTypeLocation, Events } from '../config/case-data.ts';
import { config, users } from '../config/config.dynamic.ts';
import userDetailsData from '../resources/payload/user-details.json';
import { createCaseViaCitizenUI, vetAndAcceptCitizenCase } from '../pages/helpers/CuiCaseCreationHelper.ts';

test.describe('non-HMCTS claimant legal representative Case creation in Citizen UI', () => {

  test(
    'Create a claim',
    {
      tag: [],
    },
    async ({
             page,
             respondentRepPage,
             citizenHubLoginPage,
             citizenHubPage,
             contactTheTribunalPage,
             loginPage,
             et1VettingPage,
             et1CaseServingPage,
             citizenPreLoginPage,
             citizenPostLoginPage,
             personalDetailsPage,
             employmentAndRespondentDetailsPage,
             claimDetailsPage,
             submitClaimPage, caseDetailsPage, manageCaseDashboardPage
           }) => {




      const submissionReference = await createCaseViaCitizenUI(
        page,
        citizenPreLoginPage,
        citizenPostLoginPage,
        personalDetailsPage,
        employmentAndRespondentDetailsPage,
        claimDetailsPage,
        submitClaimPage,
        'EnglandWales', 'Claiming for someone else',
        async() => { await loginPage.processLogin(users.etClaimant, config.etSyaUiUrl) },
        employmentAndRespondentDetailsPage =>
          employmentAndRespondentDetailsPage.processStillWorkingJourney(
            userDetailsData.workPostcode,
            userDetailsData.selectedWorkAddress,
            userDetailsData.firstLineOfAddress,
          ),
      );

    },
  );


});


