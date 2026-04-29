import { test } from '../fixtures/common.fixture';
import { CitizenClaimantFactory } from '../data-utils/factory/citizen/ClaimantCitizenFactory.ts';
import { CaseTypeLocation } from '../config/case-data.ts';
import { CaseEventApi } from '../data-utils/api/CaseEventApi.ts';
import config from '../config/config.ts';
import { CaseworkerCaseFactory } from '../data-utils/factory/exui/CaseworkerCaseFactory.ts';
import { base } from '@faker-js/faker';
import { BasePage } from '../pages/basePage.ts';

let caseNumber: string;
let caseId: string;
const firstName ='Grayson';
const lastName = 'Becker';
const respName= "Mrs Test Auto"
let userEmail:any;
let userPassword:any;
let userEmail2: any
let userPassword2: any


test.describe('what', () => {
test.beforeEach(async ({ manageCaseDashboardPage, loginPage }) => {
      ({ caseId, caseNumber } = await CaseworkerCaseFactory.createEnglandAndAcceptCase());
      await manageCaseDashboardPage.visit();
      await loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
      caseNumber = await manageCaseDashboardPage.navigateToCaseDetails(caseId, CaseTypeLocation.EnglandAndWales);

      userEmail = config.etRespondent.email;
      userPassword = config.etRespondent.password;
      userEmail2 = config.etRespondent2.email; 
      userPassword2 = config.etRespondent2.password; 
    });

  
    test('Respondent Assign a claim (ET3)', async ({ et3LoginPage, responseLandingPage}) => {
    await et3LoginPage.processRespondentLogin(userEmail, userPassword,caseNumber); 
    await et3LoginPage.replyToNewClaim(caseId, caseNumber, respName, firstName, lastName);
    await et3LoginPage.signOutButtonSyr();
    await et3LoginPage.processRespondentLogin(userEmail2, userPassword2,caseNumber); 
    await et3LoginPage.replyToClaimAsNewRespondent(caseId, caseNumber, respName, firstName, lastName);
    await et3LoginPage.assertErrorMessageIsVisible('Case has already assigned to a respondent'); 
    
  });
});
