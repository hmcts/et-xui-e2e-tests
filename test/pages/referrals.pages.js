/* eslint-disable no-fallthrough */
const { I } = inject();

module.exports = {
  referals_tab: '//div[9]/div[@class="mat-tab-label-content"]',
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
  selectReferral: '#selectReferral',
  replyToAdmin: '#directionTo-Admin',
  replyToJudge: '#directionTo-Judge',
  replyToLegalOfficer: '//input[@id="directionTo-Legal officer"]',
  replyEmailAddress: '#replyToEmailAddress',
  isReplyUrgentNo: '#isUrgentReply_No',
  attachDocumentToReply: '.write-collection-add-item__top',
  replyNote: '#replyGeneralNotes',
  directionDetailMsg: '#directionDetails',
  replyUploadButton: '#replyDocument_0_uploadedDocument',
  confirmationPage: '#confirmation-body',

  async submitAreferral(emailAddress, referralOption, details, urgency, referralType) {
    I.waitForElement(this.referals_tab, 10);
    I.click(this.referals_tab);
    I.waitForElement(this.create_new_referral, 15);
    await I.click(this.create_new_referral);
    I.waitForElement(this.referCaseToJudge, 35);
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
          break;
        default:
          throw new Error('there are 3 options please choose from the options listed');
      }
    } catch (e) {
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
    I.scrollPageToBottom();
    I.waitForElement(this.referralSubjectDropdown, 15);
    await I.selectOption(this.referralSubjectDropdown, referralType);
    I.forceClick(this.addReferralDoc);
    I.scrollPageToBottom();
    I.attachFile(this.uploadFileButton, '/test/data/RET_newBug.png');
    I.fillField(this.referralDocDescription, 'attach doc to referrals');
    I.wait(3);
    await I.fillField(this.referralDetails, details);
    await I.click(this.ContinueButton);
    I.waitForText('Check your answers', 15);
    I.see('Check your answers');
    I.see('Check the information below carefully.');
    await I.click(this.ContinueButton);
    I.wait(2);
    await I.click(this.ContinueButton);
  },

  async reviewReferral(sentDirection, respEmail) {
    I.waitForElement(this.referals_tab, 10);
    I.click(this.referals_tab);
    I.waitForElement(this.reply_referral, 15);
    await I.click(this.reply_referral);
    I.waitForText('Refer to admin, legal officer or judge', 15);
    //I.see('Refer to admin, legal officer or judge');
    I.selectOption(this.selectReferral, '1: 1');
    I.wait(2);
    I.click(this.ContinueButton);
    I.waitForElement(this.replyToAdmin, 10);
    // Who are you sending these directions to?
    switch (sentDirection) {
      case 'Admin':
        await I.checkOption(this.replyToAdmin);
        break;
      case 'Judge':
        await I.checkOption(this.replyToJudge);
        break;
      case 'Legal Officer':
        await I.checkOption(this.replyToLegalOfficer);
        break;
      default:
        throw new Error('You can only select Yes or No');
    }
    // add email address
    I.fillField(this.replyEmailAddress, respEmail);
    // urgency
    I.checkOption(this.isReplyUrgentNo);
    I.fillField(this.directionDetailMsg, 'approve');
    // upload attach doc
    I.click(this.attachDocumentToReply);
    I.attachFile(this.replyUploadButton, '/test/data/RET_newBug.png');
    I.fillField(this.replyNote, 'attach doc to referrals');
    I.wait(3);
    I.click(this.ContinueButton);
    I.waitForText('Check your answers', 10);
    I.wait(3);
    I.click(this.ContinueButton);
    I.waitForElement(this.confirmationPage, 10);
    I.see('What happens next');
  },
};
