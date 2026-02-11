import config from "../config/config";
import { BaseStep } from "./base";
import { Page } from '@playwright/test';
import { AxeUtils } from '@hmcts/playwright-common';
import path from 'path';

let subRef: string;
let submissionRef: string;
let caseNumber: string;

const userDetailsData = require('../data/ui-data/user-details.json');

export default class createAndAcceptCase extends BaseStep {
  constructor(page: Page) {
    super(page);
  }

  async setupCaseCreatedViaApi(page: Page, region: string, caseType: string) {
    submissionRef = await this.createCaseThroughApi.processCaseToAcceptedState(region, caseType);
    subRef = submissionRef.toString();

    await page.goto(config.TestUrlForManageCaseAAT);
    await this.loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
    const searchReference = region === 'England' ? 'EnglandWales' : region;
    caseNumber = await this.caseListPage.navigateToCaseDetails(subRef, searchReference);

    //Accept case
    await Promise.all([
      await this.caseListPage.selectNextEvent('Accept/Reject Case'),
      await this.et1CaseServingPage.processET1CaseServingPages(),
    ]);

    return { subRef, caseNumber };
  }

  async setupCUICaseCreatedViaApi(
    page: Page,
    et1VettingFlag?: boolean,
    accessibilityEnabled?: boolean,
    axeUtils?: AxeUtils,
  ) {
    submissionRef = await this.createCaseThroughApi.processCuiCaseToAcceptedState();
    subRef = submissionRef.toString();

    await page.goto(config.TestUrlForManageCaseAAT);
    await this.loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
    caseNumber = await this.caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');

    if (et1VettingFlag) {
      // Case vetting
      await this.caseListPage.selectNextEvent('ET1 case vetting');
      await this.et1VettingPage.processET1CaseVettingPages(accessibilityEnabled, axeUtils);

      // Accept case
      await this.caseListPage.selectNextEvent('Accept/Reject Case');
      await this.et1CaseServingPage.processET1CaseServingPages(accessibilityEnabled, axeUtils);
    }
    return { subRef, caseNumber };
  }

  async setupCUIcaseVetAndAcceptViaApi(et3Submission?: boolean) {
    submissionRef = await this.createCaseThroughApi.processCuiCaseVetAndAcceptState(et3Submission);
    return submissionRef;
  }

  async setupCaseWorkerCaseVetAndAcceptViaApi(page: Page, caseType: string, location: string, et3Submission?: boolean) {
    submissionRef = await this.createCaseThroughApi.processCaseWorkerCaseToAcceptedState(
      caseType,
      location,
      et3Submission,
    );
    return submissionRef;
  }

  async createCaseViaCUI(
    page: Page,
    region: string,
    loginMethod: (page: any) => Promise<void>,
    employmentJourneyMethod?: (page: any) => Promise<void>,
  ) {
    await page.goto(config.TestUrlCitizenUi);
    await this.citizenUiPage.processPreLoginPagesForTheDraftApplication(region);
    await loginMethod(this.loginPage);
    await this.taskListPage.processPostLoginPagesForTheDraftApplication();
    const location = region === 'EnglandWales' ? 'England' : region;
    await this.personalDetailsPage.processPersonalDetails(
      userDetailsData.postcode,
      location,
      userDetailsData.addressOption,
    );
    if (employmentJourneyMethod) await employmentJourneyMethod(this.employmentAndRespondentDetailsPage);
    await this.claimDetailsPage.processClaimDetails();
    const submissionReference = await this.submitClaimPage.submitClaim();
    await this.submitClaimPage.signoutButton();
    return submissionReference;
  }

  async setupCaseCreatedViaCUI(
    page: Page,
    region: string,
    submissionReference: string,
    loginCredentials: { user: string; password: string, path: string },
  ) {
    await page.goto(config.TestUrlForManageCaseAAT);
    await this.loginPage.processLogin(loginCredentials.user, loginCredentials.password, loginCredentials.path);
    const searchReference = region === 'England' ? 'EnglandWales' : region;
    caseNumber = await this.caseListPage.navigateToCaseDetails(submissionReference, searchReference);
    await this.caseListPage.verifyCaseDetailsPage(true);

    await this.caseListPage.selectNextEvent('ET1 case vetting');
    await this.et1VettingPage.processET1CaseVettingPages();
    await this.caseListPage.verifyCaseDetailsPage(false);
    await this.caseListPage.selectNextEvent('Accept/Reject Case');
    await this.et1CaseServingPage.processET1CaseServingPages();

    return caseNumber;
  }

  async setUpLegalRepCase(page: Page) {
    await page.goto(config.TestUrlForManageCaseAAT);
    await this.loginPage.processLogin(config.TestEnvETLegalRepUser, config.TestEnvETLegalRepPassword, config.loginPaths.cases);
    await this.caseListPage.claimantRepCreateCase('Employment', 'Eng/Wales - Singles', 'LS1 2AJ');

    await this.et1CreateDraftClaim.et1Section1(userDetailsData.claimantsFirstName, userDetailsData.claimantsLastName);
    await this.et1CreateDraftClaim.et1Section2(
      userDetailsData.respondentsFirstName,
      userDetailsData.respondentsLastName,
    );
    await this.et1CreateDraftClaim.et1Section3();
    let submissionReference = await this.et1CreateDraftClaim.et1SubmitClaim();
    subRef = submissionReference.toString();
    console.log('Case Submission Reference ' + submissionReference);
    await this.caseListPage.signoutButton();

    //vet the case
    await page.goto(config.TestUrlForManageCaseAAT);
    await this.loginPage.processLogin(config.TestEnvETCaseWorkerUser, config.TestEnvETPassword, config.loginPaths.worklist);
    let caseNumber = await this.caseListPage.navigateToCaseDetails(subRef, 'EnglandWales');
    await this.caseListPage.selectNextEvent('ET1 case vetting');
    await this.et1VettingPage.processET1CaseVettingPages();

    //Accept case
    await this.caseListPage.selectNextEvent('Accept/Reject Case');
    await this.et1CaseServingPage.processET1CaseServingPages();

    return { subRef, caseNumber };
  }

  async completeEt1VettingTask() {
    await this.et1VettingPage.processET1CaseVettingPages();
  }

  async createRespUser() {
    const userEmail = `ettestresp${Date.now()}@gmail.com`;
    const userPassword = 'Nagoya0102';
    await this.createCaseThroughApi.createDynamicRespondentUser(userEmail, userPassword);
    return { userEmail, userPassword };
  }
}
