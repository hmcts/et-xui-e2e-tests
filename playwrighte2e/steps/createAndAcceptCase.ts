import { params } from "../utils/config";
import { BaseStep } from "./base";
import { Page } from '@playwright/test';


let subRef: string;
let submissionRef: string;
let caseNumber;

const userDetailsData = require('../data/ui-data/user-details.json');

export default class createAndAcceptCase extends BaseStep {

   constructor(page: Page) {
          super(page);
    }

    async setupCaseCreatedViaApi(page, region: string, caseType: string) {

        submissionRef = await this.createCaseThroughApi.processCaseToAcceptedState(region, caseType);
        subRef = submissionRef.toString();

        await page.goto(params.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        const searchReference = region === "England" ? 'Eng/Wales - Singles' : `${region} - Singles`;
        await this.caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, subRef);
        caseNumber = await this.caseListPage.processCaseFromCaseList();

        //Accept case
        await Promise.all([
          await this.caseListPage.selectNextEvent('Accept/Reject Case'),
          await this.et1CaseServingPage.processET1CaseServingPages()
        ]);

        return {subRef, caseNumber};
    }

    async setupCUICaseCreatedViaApi(page, et1VettingFlag?:boolean, accessibilityEnabled?: boolean) {

        submissionRef = await this.createCaseThroughApi.processCuiCaseToAcceptedState();
        subRef = submissionRef.toString();

        await page.goto(params.TestUrlForManageCaseAAT);
        await this.loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
        await this.caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
        caseNumber = await this.caseListPage.processCaseFromCaseList();

        if (et1VettingFlag) {
            // Case vetting
            await this.caseListPage.selectNextEvent('ET1 case vetting');
            await this.et1VettingPage.processET1CaseVettingPages(accessibilityEnabled);

            // Accept case
            await this.caseListPage.selectNextEvent('Accept/Reject Case');
            await this.et1CaseServingPage.processET1CaseServingPages(accessibilityEnabled);
        }
         return {subRef, caseNumber};
    }

    async setupCUIcaseVetAndAcceptViaApi(page, et3Submission?:boolean){
        submissionRef = await this.createCaseThroughApi.processCuiCaseVetAndAcceptState(et3Submission);
        return submissionRef;
    }

    async createCaseViaCUI(page, region, loginMethod: (page) => Promise<void>, employmentJourneyMethod?: (page) => Promise<void>) {

      await page.goto(params.TestUrlCitizenUi);
      await this.citizenUiPage.processPreLoginPagesForTheDraftApplication(region);
      await loginMethod(this.loginPage);
      await this.taskListPage.processPostLoginPagesForTheDraftApplication();
      const location = region === 'EnglandWales' ? 'England' : region;
      await this.personalDetailsPage.processPersonalDetails(userDetailsData.postcode, location, userDetailsData.addressOption);
      if (employmentJourneyMethod) await employmentJourneyMethod(this.employmentAndRespondentDetailsPage);
      await this.claimDetailsPage.processClaimDetails();
      const submissionReference = await this.submitClaimPage.submitClaim();
      await this.submitClaimPage.signoutButton();

      return submissionReference;
    }

    async setupCaseCreatedViaCUI(page, region, submissionReference, loginCredentials) {

      await page.goto(params.TestUrlForManageCaseAAT);
      await this.loginPage.processLogin(loginCredentials.user, loginCredentials.password);
      const searchReference = region === 'EnglandWales' ? 'Eng/Wales - Singles' : `${region} - Singles`;
      await this.caseListPage.searchCaseApplicationWithSubmissionReference(searchReference, submissionReference);
      const caseNumber = await this.caseListPage.processCaseFromCaseList();
      await this.caseListPage.verifyCaseDetailsPage(true);

      await this.caseListPage.selectNextEvent('ET1 case vetting');
      await this.et1VettingPage.processET1CaseVettingPages();
      await this.caseListPage.verifyCaseDetailsPage(false);
      await this.caseListPage.selectNextEvent('Accept/Reject Case');
      await this.et1CaseServingPage.processET1CaseServingPages();

      return caseNumber;
    }

    async setUpLegalRepCase(page) {

      await page.goto(params.TestUrlForManageCaseAAT);
      await this.loginPage.processLogin(params.TestEnvETLegalRepUser, params.TestEnvETLegalRepPassword);
      await this.caseListPage.claimantRepCreateCase('Employment', 'Eng/Wales - Singles', 'LS1 2AJ');

      await this.et1CreateDraftClaim.et1Section1(userDetailsData.claimantsFirstName, userDetailsData.claimantsLastName);
      await this.et1CreateDraftClaim.et1Section2(userDetailsData.respondentsFirstName, userDetailsData.respondentsLastName);
      await this.et1CreateDraftClaim.et1Section3();
      let submissionReference = await this.et1CreateDraftClaim.et1SubmitClaim();
      subRef = submissionReference.toString();
      console.log('Case Submission Reference ' + submissionReference);
      await this.caseListPage.signoutButton();

      //vet the case
      await page.goto(params.TestUrlForManageCaseAAT);
      await this.loginPage.processLogin(params.TestEnvETCaseWorkerUser, params.TestEnvETPassword);
      await this.caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', subRef);
      let caseNumber = await this.caseListPage.processCaseFromCaseList();
      await this.caseListPage.selectNextEvent('ET1 case vetting');
      await this.et1VettingPage.processET1CaseVettingPages();

      //Accept case
      await this.caseListPage.selectNextEvent('Accept/Reject Case');
      await this.et1CaseServingPage.processET1CaseServingPages();

       return {subRef, caseNumber};
    }

    async completeEt1VettingTask(){
        await this.et1VettingPage.processET1CaseVettingPages();
    }
}
