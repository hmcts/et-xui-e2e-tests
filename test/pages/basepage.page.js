const { I } = inject();

module.exports = {
  startPageHeaderText: 'Make a claim to an employment tribunal',
  acasCertificateMessageWarning:
    'To make a claim you need to contact Acas and get an ‘Early conciliation certificate’ ' +
    'from them or give us a valid reason why you do not have one.',
  timeFrameMessageWarning:
    'Claims usually have to be made within 3 months of employment ending or problems happening. ' +
    'If a claim is late, you must explain why. A judge will then decide what happens next.',
  returnToExistingClaimLink: '[href="/return-to-existing"]',
  callChargeslink: '[href="#"]',
  startButton: 'Start now',

  async startDraftApplication() {
    I.see(this.startPageHeaderText);
    I.see(this.timeFrameMessageWarning);
    await I.click(this.startButton);
  },
};
