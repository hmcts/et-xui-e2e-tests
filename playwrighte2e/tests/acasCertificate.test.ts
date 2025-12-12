import { test  } from '../fixtures/common.fixture';
import config from '../config/config';
import userDetailsData from '../data/ui-data/user-details.json';
import acasCertData from '../data/ui-data/acas-content.json';

test.describe('Add & Search ACAS certificate tests', () => {
    let submissionReference: string;
    let caseNumber: string;

    test.beforeEach(async ({ page, createCaseStep }) => {
        submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
            (loginPage) => loginPage.processLoginCitizenUi(config.TestEnvETClaimantEmailAddress, config.TestEnvETClaimantPassword),
            (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processStillWorkingJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
          );

          caseNumber = await createCaseStep.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
            user: config.TestEnvETCaseWorkerUser,
            password: config.TestEnvETPassword,
            path: config.loginPaths.worklist
          });
    });

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
