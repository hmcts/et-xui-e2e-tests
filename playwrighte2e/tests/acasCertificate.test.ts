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
import { CaseTypeLocation, Events } from '../config/case-data.ts';

test.describe('Add & Search ACAS certificate tests', () => {
    let submissionReference: string;

    test.beforeEach(
      async ({
        page,
        loginPage,
        et1VettingPage,
        et1CaseServingPage,
        citizenPreLoginPage,
        citizenPostLoginPage,
        personalDetailsPage,
        employmentAndRespondentDetailsPage,
        claimDetailsPage,
        submitClaimPage, manageCaseDashboardPage, caseDetailsPage
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
          loginPage,
          et1VettingPage,
          et1CaseServingPage,
          manageCaseDashboardPage,
          caseDetailsPage,
          CaseTypeLocation.EnglandAndWales,
          submissionReference,
          {
            user: config.etCaseWorker.email,
            password: config.etCaseWorker.password,
            path: config.loginPaths.worklist,
          }
        );
      },
    );

    test('England case - ACAS certificate', {tag: '@demo'}, async ({ caseListPage, searchAcasPage, caseDetailsPage}) => {
        // Verify ACAS certificate
        await caseDetailsPage.navigateToTab('Documents');
        await caseListPage.verifyAcasCertificateDetailsOnTab(acasCertData.docName, acasCertData.docType);

        // const str = acasCertData.docName;
        let acasCertNum = acasCertData.docName.match(/[A-Za-z0-9]+\/[0-9]+\/[0-9]+/);

        // Successfully search for ACAS Certificate
        await caseDetailsPage.selectNextEvent(Events.searchAcasCertificate);
        await searchAcasPage.findAcasCertificateSuccessfully(acasCertNum ? acasCertNum[0].toString() : "No match");
    });
})
