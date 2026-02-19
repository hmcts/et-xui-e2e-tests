import { test  } from '../fixtures/common.fixture';
import config from '../config/config';
import userDetailsData from '../resources/payload/user-details.json';
import acasCertData from '../resources/payload/acas-content.json';
import { createCaseViaCitizenUI, vetAndAcceptCitizenCase } from '../pages/helpers/CuiCaseCreationHelper.ts';
import CUIPreLoginPage from '../pages/claimantCitizenHub/CUIPreLoginPage.ts';
import CUIPostLoginPages from '../pages/claimantCitizenHub/CUIPostLoginPages.ts';
import PersonalDetailsPage from '../pages/claimantCitizenHub/personalDetailsPage.ts';
import EmploymentAndRespDetailsPage from '../pages/claimantCitizenHub/employmentAndRespDetailsPage.ts';
import ClaimDetailsPage from '../pages/claimantCitizenHub/claimDetailsPage.ts';
import SubmitClaimPage from '../pages/claimantCitizenHub/submitClaimPage.ts';

test.describe('Add & Search ACAS certificate tests', () => {
    let submissionReference: string;

    test.beforeEach(
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

        submissionReference = await createCaseViaCitizenUI(
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

        await vetAndAcceptCitizenCase(
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
      },
    );

    test('England case - ACAS certificate', {tag: '@demo'}, async ({ caseListPage, searchAcasPage}) => {
        // Verify ACAS certificate
        caseListPage.navigateToTab('Documents');
        caseListPage.verifyAcasCertificateDetailsOnTab(acasCertData.docName, acasCertData.docType);

        // const str = acasCertData.docName;
        let acasCertNum = acasCertData.docName.match(/[A-Za-z0-9]+\/[0-9]+\/[0-9]+/);

        // Successfully search for ACAS Certificate
        caseListPage.selectNextEvent(acasCertData.eventName);
        await searchAcasPage.findAcasCertificateSuccessfully(acasCertNum ? acasCertNum[0].toString() : "No match");
    });
})
