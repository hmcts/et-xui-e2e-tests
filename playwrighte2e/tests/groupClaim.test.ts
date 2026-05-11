import { test } from '../fixtures/common.fixture';
import { config, users } from '../config/config.dynamic.ts';
import userDetailsData from '../resources/payload/user-details.json';
import { createCaseViaCitizenUI, vetAndAcceptCitizenCase } from '../pages/helpers/CuiCaseCreationHelper.ts';
import { CaseTypeLocation, Events } from '../config/case-data.ts';

test.describe('Group Claim Case creation in Citizen UI', () => {

  test(
    'Create a group claim',
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
        'EnglandWales',
        'Claiming for myself',
        async() => { await loginPage.processLogin(users.etClaimant, config.etSyaUiUrl)}
      );


    },
  );


});
