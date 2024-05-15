const { I } = inject();
const testConfig = require('../../config.js');

module.exports = {
  caseListText: 'Case list',
  caseListLink: '[href="/cases"]',
  hideFilterButton: '[class="govuk-button hmcts-button--secondary"]',
  jurisdictionDropdown: '#wb-jurisdiction',
  caseTypeDropdown: '#wb-case-type',
  stateDropdown: '#wb-case-state',
  tribunalOffice: '#managingOffice',
  caseNumberInputField: '#ethosCaseReference',
  receiptDateDay: '#receiptDate-day',
  receiptDateMonth: '#receiptDate-month',
  receiptDateYear: '#receiptDate-year',
  submissionReferenceLocator: '#feeGroupReference',
  respondentTextfield: '#respondent',
  applyButton: '[aria-label="Apply filter"]',
  resetButton: '[aria-label="Reset filter"]',
  nextEventDropdown: '#next-step',
  submitEventButton: '//button[@class="button"]',
  confirmAllocationButton: '[type="button"]',
  tab: '[role="tab"] div:contains("Applications")',
  //.hmcts-primary-navigation__item:nth-child(1) > .hmcts-primary-navigation__link
  myWorkLink: '//a[contains(.,"My work")]',
  myTaskTab: '[aria-current="page"]',
  availableTaskTab: '[href="/work/my-work/available"]',
  myCasesTab: '[href="/work/my-work/my-cases"]',
  accessTab: '[href="/work/my-work/my-access"]',
  availableTaskRows: 'tbody > tr:nth-of-type(1)',
  allWorkTab: '[href="/work/all-work/tasks"]',
  taskTabAllWork: '[href="/work/all-work/cases"]',
  selectAllLocationAllWork: '#radio_location_all',
  searchTaskBySpecificPerson: '[id="radio_Specific person"]]',
  searchTaskByAll: '#radio_All',
  searchTaskByUnassigned: '[id="radio_None / Available tasks"]',
  enterWAOfficerName: '#inputSelectPerson',
  enterTaskName: '#inputSelectTaskName',
  applyFilterButton: '#applyFilter',
  taskByRoleType: '#select_taskType',
  et1Vetting: '//*[@id="mat-option-0"]/span',
  linkedCasesTab: '[aria-posinset="11"] > .mat-tab-label-content',
  createCaseLink: '//a[contains(.,"Create case")]',
  xuiJurisdiction: '#cc-jurisdiction',
  xuiCaseTypeDropdown: '#cc-case-type',
  xuiCaseEventDropdown: '#cc-event',
  startEccButton: '//button[@class="button"]',
  eccCaseNumberTextField: '#caseRefECC',
  eccCurrentPosition: '#positionType',
  concilliationTrackDropdown: '#conciliationTrack',
  chooseClarkDropdown: '#clerkResponsible',
  findCaseWithRef: '#caseReference',
  findButtoncaseList: '//button[@class="govuk-button govuk-button--secondary"]',
  claimantTab:
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Claimant"]',
  taskTab:
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Tasks"]',
  roleAndAccessTab: '[aria-posinset="2"] > .mat-tab-label-content',
  allocateJudicial: '//a[contains(.,"Allocate a judicial role")]',
  allocateLegalOps: '//a[contains(.,"Allocate a legal ops role")]',
  allocateAdmin: '//a[contains(.,"Allocate an admin role")]',
  allocateCtsc: '//a[contains(.,"Allocate a CTSC role")]',
  addToExclusionList: '//a[.="Add"]',
  hearingJudgeCheckbox: '#hearing-judge',
  leadJudgeCheckbox: '#lead-judge',
  tribunalMemberOne: '#tribunal-member-1',
  tribunalMemberTwo: '#tribunal-member-2',
  reserveToMe: '#RESERVE_TO_ME',
  reserveToAnother: '#ALLOCATE_TO_ANOTHER_PERSON',
  addNametoField: '#inputSelectPerson',
  durationPeriod7days: '#contact-1',
  durationPeriodIndefinite: '#contact-2',
  durationPeriodSpecific: '#contact-3',
  continueButton: '//button[@class="govuk-button govuk-!-margin-right-3 ng-star-inserted"]',
  populatedNameText: '.mat-option-text',
  sideScrollbar:
    '.column-full > .mat-tab-group > .mat-tab-header > .mat-tab-header-pagination-before > .mat-tab-header-pagination-chevron',
  secondaryButton: '.govuk-hint',
  mutipleName: '#multipleName',
  leadCase: '#leadCase',
  multipleNotificationsTab: '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]',
  multipleNotificationLink: '//a[.="Send a notification"]',
  addCaseNumberTwo: '//button[@class="button write-collection-add-item__top"]',
  removeAdditionalCaseButton: '//button[.="Remove"]',
  addCaseNumberTextField: '//ccd-write-complex-type-field[@class="ng-star-inserted"]//input[@class="form-control bottom-30 ng-pristine ng-valid ng-touched"]',

  searchCaseApplication(option) {
    I.waitForElement(this.caseTypeDropdown, 30);
    I.see(this.caseListText);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.selectOption(this.caseTypeDropdown, option);
    I.click(this.applyButton);
  },

  searchCaseApplicationWithSubmissionReference(option, submissionReference) {
    I.refreshPage();
    I.waitForElement(this.caseListLink, 20);
    I.click(this.caseListLink);
    I.waitForElement(this.caseTypeDropdown, 30);
    I.refreshPage();
    I.wait(5);
    I.waitForElement(this.caseTypeDropdown, 25);
    I.see(this.caseListText);
    I.wait(5);
    try {
      switch (option) {
        case 'Eng/Wales - Singles':
          I.selectOption(this.caseTypeDropdown, 'Eng/Wales - Singles');
          break;
        case 'Scotland - Singles':
          I.selectOption(this.caseTypeDropdown, 'Scotland - Singles (RET)');
          break;
        default:
          throw new Error('... check you options or add new option');
      }
    } catch (error) {
      console.error('invalid option', error.message);
    }
    I.wait(5);
    I.scrollPageToBottom();
    I.waitForVisible(this.submissionReferenceLocator, 10);
    I.click(this.submissionReferenceLocator);
    I.fillField(this.submissionReferenceLocator, submissionReference);
    I.wait(3);
    I.forceClick(this.applyButton);
  },

  processCaseFromCaseList(submissionReference) {
    I.scrollPageToBottom();
    // I.waitForElement('//button[contains(.,"Hide Filter")]', 30);
    let text = `/cases/case-details/${submissionReference}`;
    let caseNumber = I.grabTextFrom(`[href="${text}"]`);
    console.log('case number is' + caseNumber);
    I.waitForElement(`[href="${text}"]`, 10);
    I.click(`[href="${text}"]`);
    return caseNumber;
  },

  selectNextEvent(option) {
    I.waitForElement(this.nextEventDropdown, 15);
    I.selectOption(this.nextEventDropdown, option);
    I.wait(3);
    //I.waitForElement(this.submitEventButton, 10);
    I.forceClick(this.submitEventButton);
    I.wait(10);
  },

  selectTab(title, submissionReference) {
    let tabUrl = testConfig.TestUrlForManageCaseAAT + `/cases/case-details/${submissionReference}/${title}`;
    I.amOnPage(tabUrl);
    I.wait(15);
  },

  selectTabLink(title, submissionReference) {
    //https://xui-et-ccd-definitions-admin-pr-353.preview.platform.hmcts.net/cases/case-details/1709055865954453#Respondent
    let tabUrl = testConfig.TestUrlForManageCaseAAT + `/cases/case-details/${submissionReference}#${title}`;
    console.log(tabUrl);
    I.amOnPage(tabUrl);
    I.wait(15);
  },

  navigateToMakeAnApplication(submissionReference) {
    let makeAnApplicationLink = `/cases/case-details/${submissionReference}/trigger/respondentTSE/respondentTSE1`;
    I.wait(10);
    I.forceClick(`[href="${makeAnApplicationLink}"]`);
  },

  verifyCaseDetailsPage(et1VettingFlag = false) {
    I.waitForElement('[tabindex="0"]', 10);
    I.see('Claimant');
    I.see('Respondent');
    I.see('Jurisdictions');
    I.see('Referrals');
    I.see('History');
    I.see('Documents');
    if (et1VettingFlag) {
      I.see('ET1Vetting');
    }
  },
  proceedtoWATaskPage() {
    //I.waitForElement(this.resetButton, 20);
    I.seeElement(this.myWorkLink);
    I.click(this.myWorkLink);
    I.waitForElement(this.myCasesTab, 10);
    I.seeElement(this.availableTaskTab);
    I.seeElement(this.myCasesTab);
    I.seeElement(this.accessTab);
  },

  proceedToAvailableTask() {
    I.click(this.availableTaskTab);
    I.seeElement(this.availableTaskRows);
  },

  searchTaskFromAllWorkAllLocation(taskTypeOption, taskByRole, taskName, submissionReference, taskVisible) {
    I.waitForElement(this.allWorkTab, 20);
    I.forceClick(this.allWorkTab);
    I.wait(5);
    //I.waitForElement(this.taskTabAllWork, 35);
    I.scrollPageToBottom();
    I.see('View and manage all tasks and cases.');
    switch (taskTypeOption) {
      case 'All':
        I.checkOption(this.searchTaskByUnassigned);
        I.checkOption(this.searchTaskByAll);
        break;
      case 'Unassigned':
        I.checkOption(this.searchTaskByUnassigned);
        break;
      case 'Assigned to a person':
        I.checkOption(this.searchTaskBySpecificPerson);
        I.fillField(this.enterWAOfficerName, 'Lefity');
        // provide a name
        break;
      default:
        throw new Error('... check your options or add new option');
    }
    I.selectOption(this.taskByRoleType, taskByRole);
    I.fillField(this.enterTaskName, taskName);
    //I.click(this.et1Vetting);
    // possibly needed more time for the case to pop up on the ui
    I.wait(5);
    I.forceClick(this.applyFilterButton);
    I.wait(55);

    let newlyCreatedTask = testConfig.TestUrlForManageCaseAAT + '/cases/case-details/' + submissionReference + '/tasks';

    if (taskVisible) {
      newlyCreatedTask.includes(submissionReference);
      I.amOnPage(newlyCreatedTask);
    } else {
      //TODO- fix
      //I.dontSeeElement(newlyCreatedTask);
      console.log('WA link is not visible under All work tab');
    }
  },

  verifiedLinkedCasesFromCaseLinkTab(submissionReference) {
    I.waitForElement(this.linkedCasesTab, 20);
    I.click(this.linkedCasesTab);
    let el = `[href="cases/case-details/${submissionReference}"]`;
    I.seeElement(el);
  },

  createEccCase(caseNumber, caseLocation) {
    I.click(this.createCaseLink);
    I.waitForElement(this.xuiCaseTypeDropdown, 10);
    I.selectOption(this.xuiJurisdiction, 'Employment');
    I.selectOption(this.xuiCaseTypeDropdown, caseLocation);
    I.selectOption(this.xuiCaseEventDropdown, 'Create Employer Contract Claim');
    I.click(this.startEccButton);
    I.waitForElement(this.eccCaseNumberTextField, 10);
    I.fillField(this.eccCaseNumberTextField, caseNumber);
    I.click(this.submitEventButton);
    I.waitForElement(this.eccCurrentPosition, 10);
    I.selectOption(this.eccCurrentPosition, 'Awaiting listing for Preliminary Hearing');
    I.selectOption(this.concilliationTrackDropdown, 'Open track');
    I.selectOption(this.chooseClarkDropdown, '1: A Clerk');
    I.click(this.submitEventButton);
    I.wait(4); //for loadiing spinner to disappear
  },

  createMutipleCase(caseType) {
    I.wait(10);
    I.click(this.createCaseLink);
    I.wait(10);
    I.selectOption(this.xuiCaseTypeDropdown, caseType);
    I.waitForElement(this.submitEventButton, 10);
    I.forceClick(this.submitEventButton);
  },

  createMutiple(name, tribOffice) {
    I.see('Create Multiple');
    I.waitForElement(this.mutipleName, 10);
    I.fillField(this.mutipleName, name);
    I.waitForClickable(this.tribunalOffice, 10);
    I.selectOption(this.tribunalOffice, tribOffice);
    I.forceClick(this.submitEventButton);
  },

  assignLeadCase(caseRef) {
    I.wait(5);
    I.see('Lead Case (Optional)');
    I.waitForElement(this.leadCase, 10);
    I.fillField(this.leadCase, caseRef);
    I.waitForElement(this.submitEventButton, 10);
    I.click(this.submitEventButton);
    I.wait(10);
  },
  addTwoCases(leadcase, case2) {
    I.wait(5);
    I.see('Lead Case (Optional)');
    I.waitForElement(this.leadCase, 10);
    I.fillField(this.leadCase, leadcase);
    I.click(this.addCaseNumberTwo);
    I.waitForElement(this.removeAdditionalCaseButton, 10);
    I.waitForElement(this.submitEventButton, 10);
    I.fillField(this.addCaseNumberTextField, case2)
    I.click(this.submitEventButton);
    I.wait(10);
  },

  findCasewithRefNumber(submissionReference) {
    I.fillField(this.findCaseWithRef, submissionReference);
    I.forceClick(this.findButtoncaseList);
    I.waitForElement(this.claimantTab, 10);
  },

  allocateRolesToCase(roleType) {
    switch (roleType) {
      case 'judiciary':
        I.waitForElement(this.allocateJudicial, 10);
        I.click(this.allocateJudicial);
        I.waitForElement(this.hearingJudgeCheckbox, 10);

        break;
      case 'legalOps':
        I.waitForElement(this.allocateLegalOps, 10);
        I.click(this.allocateLegalOps);
        break;
      case 'admin':
        I.waitForElement(this.allocateAdmin, 10);
        I.click(this.allocateAdmin);
        break;
      case 'ctsc':
        I.waitForElement(this.allocateCtsc, 10);
        I.click(this.allocateCtsc);
        break;
      case 'exclusions':
        I.waitForElement(this.allocateAdmin, 10);
        I.click(this.allocateAdmin);
        break;
      default:
        throw new Error('... check your options or add new option');
    }
  },

  completeAddingJudicialRole(judgeType, reservationOption, roleDuration, partialName) {
    switch (judgeType) {
      case 'hearing judge':
        I.checkOption(this.hearingJudgeCheckbox);
        break;
      case 'lead judge':
        I.checkOption(this.hearingJudgeCheckbox);
        break;
      case 'tribunal member one':
        I.checkOption(this.tribunalMemberOne);
        break;
      case 'tribunal member two':
        I.checkOption(this.tribunalMemberTwo);
        break;
      default:
        throw new Error('... check your options or add new option');
    }
    I.wait(2);
    I.click(this.continueButton);

    switch (reservationOption) {
      case 'reserve to me':
        I.waitForElement(this.reserveToMe, 10);
        I.click(this.reserveToMe);
        break;
      case 'reserve to another person':
        I.waitForElement(this.reserveToAnother, 10);
        I.click(this.reserveToAnother);
        break;
      default:
        throw new Error('... check your options or add new option');
    }
    I.click(this.continueButton);
    I.waitForElement(this.addNametoField, 5);
    I.fillField(this.addNametoField, partialName);
    I.wait(2);
    I.executeScript(function () {
      document.getElementsByClassName(this.populatedNameText).hover;
    });
    I.wait(2);
    I.forceClick(this.populatedNameText);
    I.click(this.continueButton);

    switch (roleDuration) {
      case '7 days':
        I.waitForElement(this.durationPeriod7days, 15);
        I.click(this.durationPeriod7days);
        break;
      case 'indefinite':
        I.waitForElement(this.durationPeriodIndefinite, 20);
        I.click(this.durationPeriodIndefinite);
        break;
      case 'Specific period':
        I.waitForElement(this.durationPeriodSpecific, 10);
        I.click(this.durationPeriodSpecific);
        break;
      default:
        throw new Error('... check your options or add new option');
    }
    I.wait(5);
    I.click(this.continueButton);
    I.waitForElement(this.secondaryButton, 10);
    I.see('Check your answers');
    I.click(this.confirmAllocationButton);
    I.wait(5);
  },

  selectMultipleNotificationsTab() {
    I.waitForElement(this.multipleNotificationsTab, 10);
    I.click(this.multipleNotificationsTab);
    I.waitForElement(this.multipleNotificationLink, 10)
    I.click(this.multipleNotificationLink);
  }
};
