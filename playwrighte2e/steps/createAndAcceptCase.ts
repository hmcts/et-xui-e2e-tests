import config from "../config/config";
import { BaseStep } from "./base";
import { Page } from '@playwright/test';
import { AxeUtils } from '@hmcts/playwright-common';
import path from 'path';

let subRef: string;
let submissionRef: string;
let caseNumber: string;

const userDetailsData = require('../resources/payload/user-details.json');

export default class createAndAcceptCase extends BaseStep {
  constructor(page: Page) {
    super(page);
  }

  async setupCaseCreatedViaApi(page: Page, region: string, caseType: string) {
    submissionRef = await this.createCaseThroughApi.processCaseToAcceptedState(region, caseType);
    subRef = submissionRef.toString();

    await page.goto(config.manageCaseBaseUrl);
    await this.loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
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

    await page.goto(config.manageCaseBaseUrl);
    await this.loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
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

  async setUpLegalRepCase(page: Page) {
    await page.goto(config.manageCaseBaseUrl);
    await this.loginPage.processLogin(config.etLegalRepresentative.email, config.etLegalRepresentative.password, config.loginPaths.cases);
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
    await page.goto(config.manageCaseBaseUrl);
    await this.loginPage.processLogin(config.etCaseWorker.email, config.etCaseWorker.password, config.loginPaths.worklist);
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
}
