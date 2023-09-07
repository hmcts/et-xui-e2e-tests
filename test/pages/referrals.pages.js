const { I } = inject();

module.exports = {
  referals_tab: '//div[9]',
  create_new_referral: '//a[.="Send a new referral"]',
  update_referral: '//a[.="Update a referral"]',
  reply_referral: '//a[.="Reply to a referral"]',
  close_referral: '//a[.="Close a referral"]',
  referCaseToAdmin: '#referCaseTo-Admin',
  referCaseToJudge: '#referCaseTo-Judge',
  referralEmail: '#referentEmail',
  referralLinks: '#referralLinks',
  referCaseToLegalOfficer: '[id="referCaseTo-Legal officer"]',
  selectYesIfUrgent: '#isUrgent_Yes',
  selectNotUrgent: '#isUrgent_No',
  referralSubjectDropdown: '#referralSubject',
  referralDetails: '#referralDetails',
  selectReferralToReply: 'selectReferralToReply',
  caseNumberDiv: 'ccd-markdown[_ngcontent-ien-c319] .markdown',
  addReferralDoc: '#referralDocument .button',
  uploadFileButton: '[type="file"]',
  referralDocDescription: '#referralDocument_0_shortDescription',
  ContinueButton: '[type="submit"]',


  async submitAreferral(emailAddress, referralOption, details, urgency, number) {
    await I.click(this.referals_tab);
    pause();
    I.waitForElement(this.referralLinks,10);
    await I.click(this.create_new_referral);
    I.waitForElement(this.ContinueButton, 10);
    try {
      switch (referralOption) {
        case 'Judge':
          await I.checkOption(this.referCaseToJudge);
          break;
        case 'Admin':
          await I.checkOption(this.referCaseToAdmin);
          break;
        case 'Legal Officer':
          await I.checkOption(this.referCaseToLegalOfficer);
        default:
          throw new Error('there are 3 options please choose from the options listed');
      }
    }
    catch (e) {
      console.error('invalid option', e.message);
    }
    await I.fillField(this.referralEmail, emailAddress);
    switch (urgency) {
      case 'Yes':
        await I.checkOption(this.selectYesIfUrgent);
        break;
      case 'No':
        await I.checkOption(this.selectYesIfUrgent);
        break;
      default:
        throw new Error('You can only select Yes or No');
    }
    // number represent the referral subject from the dropdown
    // 1 for ET1
    await I.selectOption(this.referralSubjectDropdown, "1: ET1");
    I.forceClick(this.addReferralDoc);
    I.scrollPageToBottom()
    I.attachFile(this.uploadFileButton, '../data/RET_newBug.png');
    I.fillField(this.referralDocDescription, 'attach doc to referrals');
    I.wait(3);
    await I.fillField(this.referralDetails, details);
    await I.click(this.ContinueButton);
    I.see('Check your answers');
    I.see('Check the information below carefully.');
    await I.click(this.ContinueButton);
    I.wait(2);
    await I.click(this.ContinueButton);

  }
}