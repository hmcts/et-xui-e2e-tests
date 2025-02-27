import { test } from '../fixtures/common.fixture';
import { params } from "../utils/config";

let subRef: string;
let caseNumber;


const referralData = require('../data/ui-data/referral-content.json');


test.describe.serial('England - Referral test', () => {

    test('New referral', async ({ page, createCaseStep, caseListPage, referralSteps }) => {

        ({subRef, caseNumber} = await createCaseStep.setupCaseCreatedViaApi(page, "England", "ET_EnglandWales"));

        //Send & verify new referral
        await referralSteps.processReferrals(referralData.createNewReferral, 
            (referralPage) => referralPage.sendNewReferral(), 
            (caseListPage) => caseListPage.verifyReferralDetails()
        );

        //sign out as caseworker
        await caseListPage.signoutButton();
                        
                
    });

    test('Reply to a referral', async ({ page, caseListPage, loginPage, referralSteps }) => {

        await page.goto(params.TestUrlForManageCaseAAT);

        //judge logs in
        await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();

        //Reply & verify a referral
        await referralSteps.processReferrals(referralData.replyToReferral, 
            (referralPage) => referralPage.replyToReferral(), 
            (caseListPage) => caseListPage.verifyReplyReferralDetails()
        );
        
        await caseListPage.verifyReplyDetailsOnTab('Admin');
        await caseListPage.verifyReplyDetailsOnTab('This is a test direction');

    });

    test('Z - Close a referral', async ({ page, caseListPage, loginPage, referralSteps }) => {

        await page.goto(params.TestUrlForManageCaseAAT);

        //judge logs in
        await loginPage.processLogin(params.TestEnvETJudgeUserEng, params.TestEnvETJudgeUserEngPassword);
        await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        await caseListPage.processCaseFromCaseList();

        // Close & verify a referral
        await referralSteps.processReferrals(referralData.closeReferral, 
            (referralPage) => referralPage.closeAReferral(), 
            (caseListPage) => caseListPage.verifyCloseReferralDetails()
        );
    });

});