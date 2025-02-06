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
    submitEventButton: '//button[@class="button"]',
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


    async processCaseFromCaseList() {
      let caseNumber = await this.page.getByLabel('go to case with Case').allTextContents();
      console.log('The value of the Case Number ' +caseNumber);
      await this.page.getByLabel('go to case with Case').click();
      await expect(this.page.getByRole('tab', { name: 'Case Details' }).locator('div')).toContainText('Case Details');
     // await this.page.waitForSelector('#mat-tab-label-0-1');
      return caseNumber;
    }

    async selectNextEvent(option) {

      await Promise.all([
        await this.page.locator(this.elements.submitEventButton).waitFor({ state: 'visible' }),
        await this.page.getByLabel('Next step').selectOption(option),
        // expect(this.page.getByRole('button', { name: 'Go', exact: true })).toBeEnabled(),
        await this.delay(3000),
        await this.page.locator(this.elements.submitEventButton).click()
      ]);
    } 
  
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


  async claimantRepCreateCase(jurisdiction, caseType, postcode) {
      await this.elements.createCaseLink.click();
      await this.elements.jurisdictionDropdownLR.selectOption(jurisdiction);
      await this.elements.casetypeDropdownLR.selectOption(caseType);
      await this.elements.eventLR.selectOption('Create draft claim');
      this.page.locator(this.elements.submitEventButton).click()

      await this.enterPostCode(postcode);
      await this.submitButton();
    }

  async clickTab(tabName){
    await this.page.getByText(tabName).click();
  }
  }



