import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

const params = require('../utils/config');

export default class CaseListPage extends BasePage{
  elements = {
    caseListText:'Case list',
    caseListLink: this.page.locator('[href="/cases"]'),
    // hideFilterButton: '[class="govuk-button hmcts-button--secondary"]',
    // jurisdictionDropdown: '#wb-jurisdiction',
     caseTypeDropdown: this.page.locator('#wb-case-type'),
    // stateDropdown: '#wb-case-state',
    // tribunalOffice: '#managingOffice',
    // caseNumberInputField: '#ethosCaseReference',
    // receiptDateDay: '#receiptDate-day',
    // receiptDateMonth: '#receiptDate-month',
    // receiptDateYear: '#receiptDate-year',
     submissionReferenceLocator: this.page.locator('#feeGroupReference'),
    // respondentTextfield: '#respondent',
     applyButton: this.page.locator('//button[@class="button workbasket-filters-apply"]'),
    // resetButton: '[aria-label="Reset filter"]',
    nextEventDropdown: this.page.locator('#next-step'),
     submitEventButton: this.page.locator('//button[@class="button"]'),
    // confirmAllocationButton: '[type="button"]',
    // tab: '[role="tab"] div:contains("Applications")',
    // //.hmcts-primary-navigation__item:nth-child(1) > .hmcts-primary-navigation__link
    // myWorkLink: '//a[contains(.,"My work")]',
    // myTaskTab: '[aria-current="page"]',
    // availableTaskTab: '[href="/work/my-work/available"]',
    // myCasesTab: '[href="/work/my-work/my-cases"]',
    // accessTab: '[href="/work/my-work/my-access"]',
    // availableTaskRows: 'tbody > tr:nth-of-type(1)',
    // allWorkTab: '[href="/work/all-work/tasks"]',
    // taskTabAllWork: '[href="/work/all-work/cases"]',
    // selectAllLocationAllWork: '#radio_location_all',
    // searchTaskBySpecificPerson: '[id="radio_Specific person"]]',
    // searchTaskByAll: '#radio_All',
    // searchTaskByUnassigned: '[id="radio_None / Available tasks"]',
    // enterWAOfficerName: '#inputSelectPerson',
    // enterTaskName: '#inputSelectTaskName',
    // applyFilterButton: '#applyFilter',
    // taskByRoleType: '#select_taskType',
    // et1Vetting: '//*[@id="mat-option-0"]/span',
    // linkedCasesTab: '[aria-posinset="11"] > .mat-tab-label-content',
     createCaseLink: this.page.getByText('Create case'),
    // xuiJurisdiction: '#cc-jurisdiction',
    // xuiCaseTypeDropdown: '#cc-case-type',
    // xuiCaseEventDropdown: '#cc-event',
    // startEccButton: '//button[@class="button"]',
    // eccCaseNumberTextField: '#caseRefECC',
    // eccCurrentPosition: '#positionType',
    // concilliationTrackDropdown: '#conciliationTrack',
    // chooseClarkDropdown: '#clerkResponsible',
    // findCaseWithRef: '#caseReference',
    // findButtoncaseList: '//button[@class="govuk-button govuk-button--secondary"]',
    // claimantTab:
    //   '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Claimant"]',
    // taskTab:
    //   '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Tasks"]',
    // roleAndAccessTab: '[aria-posinset="2"] > .mat-tab-label-content',
    // allocateJudicial: '//a[contains(.,"Allocate a judicial role")]',
    // allocateLegalOps: '//a[contains(.,"Allocate a legal ops role")]',
    // allocateAdmin: '//a[contains(.,"Allocate an admin role")]',
    // allocateCtsc: '//a[contains(.,"Allocate a CTSC role")]',
    // addToExclusionList: '//a[.="Add"]',
    // hearingJudgeCheckbox: '#hearing-judge',
    // leadJudgeCheckbox: '#lead-judge',
    // tribunalMemberOne: '#tribunal-member-1',
    // tribunalMemberTwo: '#tribunal-member-2',
    // reserveToMe: '#RESERVE_TO_ME',
    // reserveToAnother: '#ALLOCATE_TO_ANOTHER_PERSON',
    // addNametoField: '#inputSelectPerson',
    // durationPeriod7days: '#contact-1',
    // durationPeriodIndefinite: '#contact-2',
    // durationPeriodSpecific: '#contact-3',
    // continueButton: '//button[@class="govuk-button govuk-!-margin-right-3 ng-star-inserted"]',
    // populatedNameText: '.mat-option-text',
    // sideScrollbar:
    //   '.column-full > .mat-tab-group > .mat-tab-header > .mat-tab-header-pagination-before > .mat-tab-header-pagination-chevron',
    // secondaryButton: '.govuk-hint',
    // mutipleName: '#multipleName',
    // leadCase: '#leadCase',
    // multipleNotificationsTab: '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]',
    // multipleNotificationLink: '//a[.="Send a notification"]',
    // addCaseNumberTwo: '//button[@class="button write-collection-add-item__top"]',
    // removeAdditionalCaseButton: '//button[.="Remove"]',
    // addCaseNumberTextField: '//ccd-write-complex-type-field[@class="ng-star-inserted"]//input[@class="form-control bottom-30 ng-pristine ng-valid ng-touched"]',
    // hyperlinkToMultipleCase: '#multipleLeadClaim [target="_blank"]',
    // multipleReference: '#multipleReference',
     jurisdictionDropdownLR: this.page.locator('#cc-jurisdiction'),
     casetypeDropdownLR: this.page.locator('#cc-case-type'),
     eventLR: this.page.locator('#cc-event')
  };

    // async searchCaseApplication(option) {
    //   I.waitForElement(this.caseTypeDropdown, 30);
    //   I.see(this.caseListText);
    //   I.waitForElement(this.caseTypeDropdown, 30);
    //   I.selectOption(this.caseTypeDropdown, option);
    //   I.click(this.applyButton);
    // },

    async searchCaseApplicationWithSubmissionReference(option, submissionReference) {
      await this.page.reload();
      await expect(this.elements.caseListLink).toBeVisible();
      await this.elements.caseListLink.click();
      await expect(this.elements.caseTypeDropdown).toBeVisible();
      await expect(this.elements.applyButton).toBeVisible();
      await expect(this.page.locator('h1')).toContainText('Case list');
      try {
        switch (option) {
          case 'Eng/Wales - Singles':
            await this.elements.caseTypeDropdown.selectOption('Eng/Wales - Singles');
            break;
          case 'Scotland - Singles':
            await this.elements.caseTypeDropdown.selectOption('Scotland - Singles (RET)');
            break;
          default:
            throw new Error('... check you options or add new option');
        }
      } catch (error) {
        console.error('invalid option', error.message);
      }

      await this.elements.submissionReferenceLocator.fill(submissionReference);
      await this.elements.applyButton.click();
      await expect(this.page.locator('#search-result')).toContainText(submissionReference);
    }


    async processCaseFromCaseList(submissionReference) {
      let caseNumber = await this.page.getByLabel('go to case with Case').allTextContents();
      console.log('The value of the Case Number ' +caseNumber);
      await this.page.getByLabel('go to case with Case').click();
      await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
     // await this.page.waitForSelector('#mat-tab-label-0-1');
      return caseNumber;
    }

    async selectNextEvent(option) {
      await this.elements.submitEventButton.isDisabled();
      await this.page.getByLabel('Next step').selectOption(option);
      //await this.elements.nextEventDropdown.selectOption(option);
      await this.elements.submitEventButton.isVisible();
      await this.elements.submitEventButton.click();

    }

  //   async selectTab(title, submissionReference) {
  //     let tabUrl = testConfig.TestUrlForManageCaseAAT + `/cases/case-details/${submissionReference}/${title}`;
  //     I.amOnPage(tabUrl);
  //     I.wait(15);
  //   },
  //
  //   async selectTabLink(title, submissionReference) {
  //     //https://xui-et-ccd-definitions-admin-pr-353.preview.platform.hmcts.net/cases/case-details/1709055865954453#Respondent
  //     let tabUrl = testConfig.TestUrlForManageCaseAAT + `/cases/case-details/${submissionReference}#${title}`;
  //     console.log(tabUrl);
  //     I.amOnPage(tabUrl);
  //     I.wait(15);
  //   },
  //
  //   async navigateToMakeAnApplication(submissionReference) {
  //     let makeAnApplicationLink = `/cases/case-details/${submissionReference}/trigger/respondentTSE/respondentTSE1`;
  //     I.wait(10);
  //     I.forceClick(`[href="${makeAnApplicationLink}"]`);
  //   },
  //
  //   async navigateToClaimantRepMakeAnApplication(submissionReference) {
  //     let makeAnApplicationLink = `/cases/case-details/${submissionReference}/trigger/claimantTSE/claimantTSE1`;
  //     I.wait(10);
  //     I.forceClick(`[href="${makeAnApplicationLink}"]`);
  //   },
  //
    async verifyCaseDetailsPage(et1VettingFlag) {
      if (et1VettingFlag) {
        //TO DO fix this tab Ids are not consistent
        // await expect(this.page.locator('#mat-tab-label-0-0')).toContainText('Case Details');
        // await expect(this.page.locator('#mat-tab-label-0-1')).toContainText('Claimant');
        // await expect(this.page.locator('#mat-tab-label-0-2')).toContainText('Respondent');
        // await expect(this.page.locator('#mat-tab-label-0-4')).toContainText('Jurisdictions');
        // await expect(this.page.locator('#mat-tab-label-0-5')).toContainText('Referrals');
        // await expect(this.page.locator('#mat-tab-label-0-6')).toContainText('History');
        // await expect(this.page.locator('#mat-tab-label-0-7')).toContainText('Documents');
      }
      else {
        //await expect(this.page.locator('#mat-tab-label-1-2')).toContainText('ET1 Vetting');
      }
    }

  //   async proceedtoWATaskPage() {
  //     //I.waitForElement(this.resetButton, 20);
  //     I.seeElement(this.myWorkLink);
  //     I.click(this.myWorkLink);
  //     I.waitForElement(this.myCasesTab, 10);
  //     I.seeElement(this.availableTaskTab);
  //     I.seeElement(this.myCasesTab);
  //     I.seeElement(this.accessTab);
  //   },
  //
  //   async proceedToAvailableTask() {
  //     I.click(this.availableTaskTab);
  //     I.seeElement(this.availableTaskRows);
  //   },
  //
  // async searchTaskFromAllWorkAllLocation(taskTypeOption, taskByRole, taskName, submissionReference, taskVisible) {
  //     I.waitForElement(this.allWorkTab, 20);
  //     I.forceClick(this.allWorkTab);
  //     I.wait(5);
  //     //I.waitForElement(this.taskTabAllWork, 35);
  //     I.scrollPageToBottom();
  //     I.see('View and manage all tasks and cases.');
  //     switch (taskTypeOption) {
  //       case 'All':
  //         I.checkOption(this.searchTaskByUnassigned);
  //         I.checkOption(this.searchTaskByAll);
  //         break;
  //       case 'Unassigned':
  //         I.checkOption(this.searchTaskByUnassigned);
  //         break;
  //       case 'Assigned to a person':
  //         I.checkOption(this.searchTaskBySpecificPerson);
  //         I.fillField(this.enterWAOfficerName, 'Lefity');
  //         // provide a name
  //         break;
  //       default:
  //         throw new Error('... check your options or add new option');
  //     }
  //     I.selectOption(this.taskByRoleType, taskByRole);
  //     I.fillField(this.enterTaskName, taskName);
  //     //I.click(this.et1Vetting);
  //     // possibly needed more time for the case to pop up on the ui
  //     I.wait(5);
  //     I.forceClick(this.applyFilterButton);
  //     I.wait(55);
  //
  //     let newlyCreatedTask = testConfig.TestUrlForManageCaseAAT + '/cases/case-details/' + submissionReference + '/tasks';
  //
  //     if (taskVisible) {
  //       newlyCreatedTask.includes(submissionReference);
  //       I.amOnPage(newlyCreatedTask);
  //     } else {
  //       //TODO- fix
  //       //I.dontSeeElement(newlyCreatedTask);
  //       console.log('WA link is not visible under All work tab');
  //     }
  //   },
  //
  // async verifiedLinkedCasesFromCaseLinkTab(submissionReference) {
  //     I.waitForElement(this.linkedCasesTab, 20);
  //     I.click(this.linkedCasesTab);
  //     let el = `[href="cases/case-details/${submissionReference}"]`;
  //     I.seeElement(el);
  //   },
  //
  // async createEccCase(caseNumber, caseLocation) {
  //     I.click(this.createCaseLink);
  //     I.waitForElement(this.xuiCaseTypeDropdown, 10);
  //     I.selectOption(this.xuiJurisdiction, 'Employment');
  //     I.selectOption(this.xuiCaseTypeDropdown, caseLocation);
  //     I.selectOption(this.xuiCaseEventDropdown, 'Create Employer Contract Claim');
  //     I.click(this.startEccButton);
  //     I.waitForElement(this.eccCaseNumberTextField, 10);
  //     I.fillField(this.eccCaseNumberTextField, caseNumber);
  //     I.click(this.submitEventButton);
  //     I.waitForElement(this.eccCurrentPosition, 10);
  //     I.selectOption(this.eccCurrentPosition, 'Awaiting listing for Preliminary Hearing');
  //     I.selectOption(this.concilliationTrackDropdown, 'Open track');
  //     I.selectOption(this.chooseClarkDropdown, '1: A Clerk');
  //     I.click(this.submitEventButton);
  //     I.wait(4); //for loadiing spinner to disappear
  //   },
  //
  // async createMutipleCase(caseType) {
  //     I.wait(10);
  //     I.click(this.createCaseLink);
  //     I.wait(10);
  //     I.selectOption(this.xuiCaseTypeDropdown, caseType);
  //     I.waitForElement(this.submitEventButton, 10);
  //     I.forceClick(this.submitEventButton);
  //   },
  //
  // async createMutiple(name, tribOffice) {
  //     I.see('Create Multiple');
  //     I.waitForElement(this.mutipleName, 10);
  //     I.fillField(this.mutipleName, name);
  //     I.waitForClickable(this.tribunalOffice, 10);
  //     I.selectOption(this.tribunalOffice, tribOffice);
  //     I.forceClick(this.submitEventButton);
  //   },
  //
  // async assignLeadCase(caseRef) {
  //     I.wait(5);
  //     I.see('Lead Case (Optional)');
  //     I.waitForElement(this.leadCase, 10);
  //     I.fillField(this.leadCase, caseRef);
  //     I.waitForElement(this.submitEventButton, 10);
  //     I.click(this.submitEventButton);
  //     I.wait(10);
  //   },
  // async addTwoCases(leadcase, case2, isCaseVetted) {
  //     I.wait(5);
  //     I.see('Lead Case (Optional)');
  //     I.waitForElement(this.leadCase, 10);
  //     I.fillField(this.leadCase, leadcase);
  //     I.click(this.addCaseNumberTwo);
  //     I.waitForElement(this.removeAdditionalCaseButton, 10);
  //     I.waitForElement(this.submitEventButton, 10);
  //     I.fillField(this.addCaseNumberTextField, case2)
  //     switch (isCaseVetted) {
  //       case 'true':
  //         I.click(this.submitEventButton);
  //         break;
  //       case 'false':
  //         I.click(this.submitEventButton);
  //         I.see('Unable to proceed because there are one or more callback Errors or Warnings');
  //         I.see('cases have not been Accepted, but are Submitted. If this is permissible please click Ignore and Continue');
  //         I.click(this.submitEventButton);
  //         break;
  //       default:
  //         throw new Error('... check your options or add new option');
  //     }
  //     I.wait(10);
  //   },
  //
  // async findCasewithRefNumber(submissionReference) {
  //     I.fillField(this.findCaseWithRef, submissionReference);
  //     I.forceClick(this.findButtoncaseList);
  //     I.waitForElement(this.claimantTab, 10);
  //   },
  //
  // async allocateRolesToCase(roleType) {
  //     switch (roleType) {
  //       case 'judiciary':
  //         I.waitForElement(this.allocateJudicial, 10);
  //         I.click(this.allocateJudicial);
  //         I.waitForElement(this.hearingJudgeCheckbox, 10);
  //
  //         break;
  //       case 'legalOps':
  //         I.waitForElement(this.allocateLegalOps, 10);
  //         I.click(this.allocateLegalOps);
  //         break;
  //       case 'admin':
  //         I.waitForElement(this.allocateAdmin, 10);
  //         I.click(this.allocateAdmin);
  //         break;
  //       case 'ctsc':
  //         I.waitForElement(this.allocateCtsc, 10);
  //         I.click(this.allocateCtsc);
  //         break;
  //       case 'exclusions':
  //         I.waitForElement(this.allocateAdmin, 10);
  //         I.click(this.allocateAdmin);
  //         break;
  //       default:
  //         throw new Error('... check your options or add new option');
  //     }
  //   },
  //
  // async completeAddingJudicialRole(judgeType, reservationOption, roleDuration, partialName) {
  //     switch (judgeType) {
  //       case 'hearing judge':
  //         I.checkOption(this.hearingJudgeCheckbox);
  //         break;
  //       case 'lead judge':
  //         I.checkOption(this.hearingJudgeCheckbox);
  //         break;
  //       case 'tribunal member one':
  //         I.checkOption(this.tribunalMemberOne);
  //         break;
  //       case 'tribunal member two':
  //         I.checkOption(this.tribunalMemberTwo);
  //         break;
  //       default:
  //         throw new Error('... check your options or add new option');
  //     }
  //     I.wait(2);
  //     I.click(this.continueButton);
  //
  //     switch (reservationOption) {
  //       case 'reserve to me':
  //         I.waitForElement(this.reserveToMe, 10);
  //         I.click(this.reserveToMe);
  //         break;
  //       case 'reserve to another person':
  //         I.waitForElement(this.reserveToAnother, 10);
  //         I.click(this.reserveToAnother);
  //         break;
  //       default:
  //         throw new Error('... check your options or add new option');
  //     }
  //     I.click(this.continueButton);
  //     I.waitForElement(this.addNametoField, 5);
  //     I.fillField(this.addNametoField, partialName);
  //     I.wait(2);
  //     I.executeScript(function () {
  //       document.getElementsByClassName(this.populatedNameText).hover;
  //     });
  //     I.wait(2);
  //     I.forceClick(this.populatedNameText);
  //     I.click(this.continueButton);
  //
  //     switch (roleDuration) {
  //       case '7 days':
  //         I.waitForElement(this.durationPeriod7days, 15);
  //         I.click(this.durationPeriod7days);
  //         break;
  //       case 'indefinite':
  //         I.waitForElement(this.durationPeriodIndefinite, 20);
  //         I.click(this.durationPeriodIndefinite);
  //         break;
  //       case 'Specific period':
  //         I.waitForElement(this.durationPeriodSpecific, 10);
  //         I.click(this.durationPeriodSpecific);
  //         break;
  //       default:
  //         throw new Error('... check your options or add new option');
  //     }
  //     I.wait(5);
  //     I.click(this.continueButton);
  //     I.waitForElement(this.secondaryButton, 10);
  //     I.see('Check your answers');
  //     I.click(this.confirmAllocationButton);
  //     I.wait(5);
  //   },
  //
  // async selectMultipleNotificationsTab() {
  //     I.waitForElement(this.multipleNotificationsTab, 10);
  //     I.click(this.multipleNotificationsTab);
  //   },
  //
  //
  // async getMultiplecaseNumber() {
  //     I.waitForElement(this.hyperlinkToMultipleCase, 10);
  //     return I.grabTextFrom(this.hyperlinkToMultipleCase);
  //   },
  // async searchMultipleCaseWithCaseNumber(option, caseNumberForMultiple) {
  //     I.refreshPage();
  //     I.waitForElement(this.caseListLink, 20);
  //     I.click(this.caseListLink);
  //     I.waitForElement(this.caseTypeDropdown, 30);
  //     I.refreshPage();
  //     I.wait(5);
  //     I.waitForElement(this.caseTypeDropdown, 25);
  //     I.see(this.caseListText);
  //     I.wait(5);
  //     try {
  //       switch (option) {
  //         case 'Eng/Wales - Multiples':
  //           I.selectOption(this.caseTypeDropdown, 'Eng/Wales - Multiples');
  //           break;
  //         case 'Scotland - Multiples (RET)':
  //           I.selectOption(this.caseTypeDropdown, 'Scotland - Multiples (RET)');
  //           break;
  //         default:
  //           throw new Error('... check you options or add new option');
  //       }
  //     } catch (error) {
  //       console.error('invalid option', error.message);
  //     }
  //     I.wait(5);
  //     I.scrollPageToBottom();
  //     I.waitForVisible(this.submissionReferenceLocator, 10);
  //     I.click(this.multipleReference);
  //     I.fillField(this.multipleReference,caseNumberForMultiple );
  //     I.scrollPageToBottom();
  //     I.click(this.applyButton);
  //     I.wait(5)
  //   },

  async claimantRepCreateCase(jurisdiction, caseType, postcode) {
      await this.elements.createCaseLink.click();
      await this.elements.jurisdictionDropdownLR.selectOption(jurisdiction);
      await this.elements.casetypeDropdownLR.selectOption(caseType);
      await this.elements.eventLR.selectOption('Create draft claim');
      await this.elements.submitEventButton.click();

      await this.enterPostCode(postcode);
      await this.submitButton();
    }

    async clickTab(tabName){
      await this.page.getByText(tabName).click();
    }
  }



