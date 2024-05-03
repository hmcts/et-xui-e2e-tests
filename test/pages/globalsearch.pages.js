const { I } = inject();

module.exports = {
  searchPage: '//a[contains(.,"Search")]',
  searchButton: '[type="submit"]',
  submissionRefField: '#caseRef',
  otherRefField: '#otherRef',
  searchNameField: '#fullName',
  searchAddressLine1: '#addressLine1',
  searchPostCode: '#postcode',
  searchEmail: '#email',
  dayBirth: '#dateOfBirth',
  monthBirth: '#dateOfBirth-month',
  yearBirth: '#dateOfBirth-year',
  dayDeath: '#dateOfDeath',
  monthDeath: '#dateOfDeath-month',
  yearDeath: '#dateOfDeath-year',
  changeSearchLink: '//a[contains(.,"Change search")]',
  specificAccessChallenge: '//a[contains(.,"Specific access")]',
  authorisationBanner: '//div[@class="hmcts-banner"]/div[@class="hmcts-banner__message"]',
  cancelButton: '//a[contains(.,"Cancel")]',
  accessRequestButton: '//button[@class="govuk-button govuk-!-margin-right-3"]',
  challengedAccessLink: '//a[contains(.,"Challenged access")]',
  accessToCaseLink: '//a[contains(.,"View")]',

  searchingWithOneParam(searchOption, searchOption2) {
    I.waitForElement(this.searchPage, 10);
    I.click(this.searchPage);
    I.waitForElement(this.yearDeath, 10);
    switch (searchOption) {
      case 'submission reference':
        I.fillField(this.submissionRefField, searchOption2);
        break;
      case 'other reference':
        I.fillField(this.otherRefField, searchOption2);
        break;
      case 'name':
        I.fillField(this.searchNameField, searchOption2);
        break;
      case 'first line of Address':
        I.fillField(this.searchAddressLine1, searchOption2);
        break;
      case 'post code':
        I.fillField(this.searchPostCode, searchOption2);
        break;
      case 'email address':
        I.fillField(this.searchEmail);
        break;
      case 'date of Birth':
        I.fillField(this.dayBirth);
        I.fillField(this.dayBirth);
        I.fillField(this.dayBirth);
        break;
      case 'date of death':
        I.fillField(this.dayDeath);
        I.fillField(this.dayDeath);
        I.fillField(this.dayDeath);
        break;
      default:
        throw new Error('... check you options or add new option');
    }
    I.wait(2);
    I.click(this.searchButton);
    I.waitForElement(this.changeSearchLink, 30);
    I.see('Search results');
  },

  verifyAccessToCase() {
    I.waitForElement(this.accessToCaseLink, 10);
    I.see(' View ')
  },
  verifySpecificAccessRequest() {
    I.waitForElement(this.specificAccessChallenge,10);
    I.see('Specific access');
    I.click(this.specificAccessChallenge);
    I.waitForElement(this.accessRequestButton, 10);
    I.see(' Request access ');
    I.click(this.cancelButton);
  },
  verifyChallengedAccessRequest() {
    I.waitForElement(this.challengedAccessLink,10);
    I.see(' Challenged access ');
    I.click(this.challengedAccessLink);
    I.waitForElement(this.accessRequestButton, 10);
    I.see('Access');
    I.see('Challenged');
    I.see(' Request access ');
    I.click(this.cancelButton);
  }
};
