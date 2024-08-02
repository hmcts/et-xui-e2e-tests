import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import CaseListPage from '../pages/caseListPage';
import Et1CreateDraftClaim from '../pages/et1CreateDraftClaim';
//import ApplicationPage from "../pages/applicationPage";
import {params} from '../utils/config';


const postcode = 'LS1 2AJ';
const claimantsFirstName = 'Jessamine';
const claimantsLastName= 'Malcom';
const respondentsFirstName= 'Mark';
const respondentsLastName = 'McDonald';

test('Claimant Representative creates a claim (England and Wales - Singles) and submit', async ({ page }) => {


    let loginPage = new LoginPage(page);
    let caseListPage= new CaseListPage(page);
    let et1CreateDraftClaim= new Et1CreateDraftClaim(page);
    //let applicationPage = new ApplicationPage(page);


    await page.goto(params.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
    await caseListPage.claimantRepCreateCase('Employment','Eng/Wales - Singles', postcode);

    await et1CreateDraftClaim.et1Section1(claimantsFirstName, claimantsLastName);
    await et1CreateDraftClaim.et1Section2(respondentsFirstName, respondentsLastName);
    await et1CreateDraftClaim.et1Section3();
    let submissionReference = await et1CreateDraftClaim.et1SubmitClaim();
    console.log('The value of the Case Number ' + submissionReference);

    //Legal rep makes an application- R92 Yes (offline scenario -only claimant rep is online user)
    //RET-5191&92
    // await applicationPage.clickApplicationTab();
    // await applicationPage.navigateMakeAnApplicationLink();
    // await applicationPage.makeAnApplicationR92WithYesOption('Yes');
    //
    // //Legal rep makes an application- R92 No
    // await applicationPage.clickApplicationTab();
    // await applicationPage.navigateMakeAnApplicationLink();
    // await applicationPage.makeAnApplicationR92WithYesOption('No');

    //TODO NOC-5188, 5190...

    // await page.goto(params.TestUrlForManageCaseAAT);
    // await loginPage.processLoginOnXui(params.TestEnvETLegalRepUserDiffOrg, params.TestEnvETLegalRepPasswordDiffOrg);

});
