const { I } = inject();
//do it for wait for element, clicks, fill fields, select options
module.exports = {
  ElementManageOrg: '.hmcts-header__link',
  ClickAssignedCases: '//a[.="Assigned cases"]',
  ClickUnassignedCases: '//a[.="Unassigned cases"]',
  clickShowCasesFilter: '.govuk-button--secondary',
  ClickShowUnassignedCasesFilter: '//button[@class="govuk-button govuk-button--secondary"]',
  AllAssigneesRadio: '[for="caa-filter-all-assignees"]',
  ApplyFilterButton: '.form > button:nth-of-type(1)',
  AssignedCasesElement: '.govuk-heading-xl',
  AssigneeNameSearchBox: '#assignee-person',
  AssigneeNameRadio: '[for="caa-filter-assignee-name"]',
  englandWalesCaseLink: '#mat-tab-label-0-0',
  scotlandCaseLink: '#mat-tab-label-0-1',
  searchCase: '[type="submit"]',
  caseNumberFillField: '#case-reference-number',
  applyFilter: '.form > button:nth-of-type(1)',
  shareCaseButton: '#btn-share-unassigned-case-button',
  elementAddRecipient: '.govuk-heading-xl govuk-!-margin-top-2 ng-star-inserted',
  addRecipientFillField: '.mat-autocomplete-trigger',
  openAllExpand: '.govuk-accordion__controls > [type="button"]',
  continueButton: '#btn-continue',
  checkAndConfirmButton: '.govuk-button',
  updatedCases: '.govuk-panel__title',
  assignedCasesLink: '.[href="/assigned-cases"][_ngcontent-dsq-c313]',
  assignedCasesLink2: '.hmcts-primary-navigation__link[href="/assigned-cases""]',
  filterCaseRefNumber: '[for="caa-filter-case-reference-number"]',
  applyFilterAssignedCases: '.govuk-button[_ngcontent-dsq-c311]',
  assignedCasesScotlandCheckbox: '#select-1686652294973349',
  manageCaseSharingAssignedBtn: '#btn-share-assigned-case-button',


  allAssignedCases() {
    I.waitForElement(this.ElementManageOrg, 20);
    I.see('Organisation');
    I.see('Users');
    I.see('Unassigned Cases');
    I.see('Assigned Cases');
    I.click(this.ClickAssignedCases);
    I.see('Assigned Cases');
    I.click(this.ClickShowCasesFilter);
    I.see('Filter assigned cases');
    I.see('All assignees');
    I.click(this.AllAssigneesRadio);
    I.click(this.ApplyFilterButton);
    //after assigning case, unassing it
  },

  filterByAssigneeName() {
    I.waitForElement(this.AssignedCasesElement, 20);
    I.see('Assignee name');
    I.click(this.AssigneeNameRadio);
    I.see('Type the name and select an available match option');
    I.click(this.AssigneeNameSearchBox);
    I.fillField;
    I.click(this.ApplyFilterButton);
  },

  filterByReferenceNumber() {
    I.waitForElement(this.AssignedCasesElement, 20);
    I.see('Case reference number');
    I.see('Enter the 16-digit case reference number');
    I.click(this.CaseReferenceSearchBox);
    I.fillField;
    I.click(this.ApplyFilterButton);
  },

  searchForUnassignedCaseUsingFilter(submissionReference) {
    pause();
    I.click(this.ClickUnassignedCases);
    I.click(this.ClickShowUnassignedCasesFilter);
    I.fillField(this.caseNumberFillField, submissionReference);
    I.click(this.applyFilter);
    I.wait(2);
    I.fillField(this.CaseReferenceSearchBox);
    //I.click(this.searchCase);
    I.fillField(this.caseNumberFillField, submissionReference);
    I.click(this.applyFilter);
    I.wait(2);
    /*
    //new page
    I.waitForElement(this.elementAddRecipient, 20);
    I.see('Enter email address');
    I.fillField(this.addRecipientFillField, 'Legal Rep One - et.legalrep1@outlook.com');
    I.click(this.openAllExpand);
    I.click(this.continueButton);
    //new page
    I.see('Share a case');
    I.see('Check and confirm your selection');
    I.click(this.checkAndConfirmButton);
    I.waitForElement(this.updatedCases);
    I.see('What happens next');
    I.see("If you've shared one or more cases, your colleagues will now be able to access them from their case list.");
    I.click(this.assignedCasesLink);
    //new page
    I.click(this.filterCaseRefNumber);
    I.click(this.CaseReferenceSearchBox);
    I.fillField(this.applyFilterAssignedCases, submissionReference);
    I.see('Select any ET_Scotland cases you want to manage case sharing for.');
    I.click(this.assignedCasesScotlandCheckbox);
    I.click(this.manageCaseSharingAssignedBtn);
    //new page
    I.click(this.ClickUnassignedCases);
    I.click(this.ClickShowUnassignedCasesFilter);
    I.fillField(this.CaseReferenceSearchBox);
    I.fillField(this.caseNumberFillField, submissionReference);
    I.click(this.applyFilter);
    I.wait(3);
    I.see('Try again using a different case reference.');*/
  },

  unassignedCases(option) {
    switch (option) {
      case 'EnglandWales':
        I.click(this.englandWalesCaseLink);
        break;
      case 'Scotland':
        I.click(this.scotlandCaseLink);
        break;
      default:
        throw new Error('You must select either EnglandWales Case Link or Scotland Case Link');
    }

    I.waitForElement(this.ElementManageOrg, 20);
    I.click(this.ClickUnassignedCases);
    I.see('Unassigned Cases');
    I.see('Show unassigned cases filter');
    I.click(this.ClickShowUnassignedCasesFilter);
    I.see('Search for an unassigned case');
    I.click('#case-reference-number');
    I.fillField;
    I.click(this.ApplyFilterButton);
  },

  assignCaseToSolicitor() {
    this.allAssignedCases;
    this.filterByAssigneeName;
    this.filterByReferenceNumber;
  },

  unassignCaseFromSolicitor() {
    this.unassignedCases;
  },
};
