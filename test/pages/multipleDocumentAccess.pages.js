const { I } = inject();

module.exports = {
  accessToCitizen: '#documentAccess-Citizens',
  accessToLegalRepRespondent: '[id="documentAccess-Legal rep/respondents"]',
  accessToALlParties: '[id="documentAccess-Both Citizens and Legal rep/respondents"]',
  clearAccess: '[id="documentAccess-None (clear access)"]',
  continueButton: '[type="submit"]',
  selectDocToAttach: '[name="documentSelect"]',

  grantAccessToDucment(options) {
   I.waitForElement(this.accessToCitizen, 10);
   I.see('Document Access');
   switch (options) {
     case 'Citizen':
       I.click(this.accessToCitizen);
       break;
     case 'Legal rep/Respondent':
       I.click(this.accessToLegalRepRespondent);
       break;
     case 'Both':
       I.click(this.accessToALlParties);
       break;
     case 'Clear Access':
       I.click(this.clearAccess);
       break;
     default:
       throw new Error('... check you options and try again');
   }
   I.click(this.continueButton);
   I.waitForElement(this.selectDocToAttach, 5);
   I.checkOption(this.selectDocToAttach);
   I.click(this.continueButton);
   I.waitForText('Check your answers', 5);
   I.click(this.continueButton);
  }
};
