import { test  } from '../fixtures/common.fixture';
import { params } from '../utils/config';

const userDetailsData = require('../data/ui-data/user-details.json');
const acasCertData = require('../data/ui-data/acas-content.json');

test.describe('Add & Search ACAS certificate tests', () => {    
    let submissionReference: string;
    let caseNumber;

    test.beforeEach(async ({ page, createCaseStep }) => {
        submissionReference = await createCaseStep.createCaseViaCUI(page, 'EnglandWales',
            (loginPage) => loginPage.processLogin(params.TestEnvETClaimantEmailAddress, params.TestEnvETClaimantPassword),
            (employmentAndRespondentDetailsPage) => employmentAndRespondentDetailsPage.processStillWorkingJourney(userDetailsData.workPostcode, userDetailsData.selectedWorkAddress, userDetailsData.firstLineOfAddress)
          );
      
          caseNumber = await createCaseStep.setupCaseCreatedViaCUI(page, 'EnglandWales', submissionReference, {
            user: params.TestEnvETCaseWorkerUser,
            password: params.TestEnvETPassword
          });
    });

    test('England case - ACAS certificate', async ({ caseListPage, searchAcasPage}) => {
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