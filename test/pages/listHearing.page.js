const { I } = inject();
const today = new Date();
const listDay = today.getDate() + 1;
const currentDay = today.getDate();
const previousDay = today.getDate() - 1;
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear();

module.exports = {
  hearingElement: '#hearingCollection',
  hearingNumber: '#hearingCollection_0_hearingNumber',
  //hearingOption: '#hearingCollection_0_Hearing_type',
  hearingOption: '#hearingCollection_0_Hearing_type',
  hearingFormatOption: '//input[@value="In person"]',
  hearingHybridOption: '#hearingCollection_0_hearingFormat-Hybrid',
  judicialMediationOption: '#hearingCollection_0_judicialMediation_No',
  hearingVenueOption: '#hearingCollection_0_Hearing_venue',
  hearingLengthNum: '#hearingCollection_0_hearingEstLengthNum',
  dayHourMinutes: '#hearingCollection_0_hearingEstLengthNumType',
  sitAlonePanel: '#hearingCollection_0_hearingSitAlone-Sit\\ Alone',
  fullPanel: '#hearingCollection_0_hearingSitAlone-Full Panel',
  hearingStage: '#hearingCollection_0_Hearing_stage',
  hearingNotes: '#hearingCollection_0_Hearing_notes',
  dateSetUp: '#hearingCollection_0_hearingDateCollection > div > button',
  hearingListDay: '#listedDate-day',
  hearingListMonth: '#listedDate-month',
  hearingListYear: '#listedDate-year',
  submitHearingButton: '[type="submit"]',
  selectHearing: '#hearingDetailsHearing',
  hearingStatus: '#hearingDetailsCollection_0_hearingDetailsStatus',
  disposePartOfCase: '#hearingDetailsCollection_0_hearingDetailsCaseDisposed_No',

  async listCase(location) {
    switch (location) {
      case 'EnglandWales':
        I.waitForElement(this.hearingNumber, 10);
        I.see('Case Number');
        I.fillField(this.hearingNumber, '1');
        // hearing format
        I.checkOption(this.hearingHybridOption);
        //hearing type
        I.selectOption(this.hearingOption, '1: Costs Hearing');
        I.checkOption(this.judicialMediationOption);
        I.selectOption(this.hearingVenueOption, '2: Hull');
        I.fillField(this.hearingLengthNum, '1');
        I.selectOption(this.dayHourMinutes, '1: Days');
        //sit alone or full panel
        I.checkOption(this.sitAlonePanel);
        I.selectOption(this.hearingStage, '1: Stage 1');
        I.fillField(this.hearingNotes, 'The hearing should be help as soon as possible....');
        I.scrollPageToBottom();
        I.forceClick(this.dateSetUp);
        I.wait(2);
        I.fillField(this.hearingListDay, listDay);
        I.fillField(this.hearingListMonth, listMonth);
        I.fillField(this.hearingListYear, listYear);
        I.click(this.submitHearingButton);
        break;
      case 'Scotland':
        I.waitForElement(this.hearingNumber, 10);
        I.see('Case Number');
        I.fillField(this.hearingNumber, '01');
        // hearing format
        I.checkOption(this.hearingHybridOption);
        //hearing type
        I.selectOption(this.hearingOption, '1: Costs Hearing');
        I.checkOption(this.judicialMediationOption);
        I.selectOption(this.hearingVenueOption, '1: Glasgow');
        I.fillField(this.hearingLengthNum, '1');
        I.selectOption(this.dayHourMinutes, '1: Days');
        //sit alone or full panel
        I.checkOption(this.sitAlonePanel);
        I.selectOption(this.hearingStage, '1: Stage 1');
        I.fillField(this.hearingNotes, 'The hearing should be help as soon as possible....');
        I.scrollPageToBottom();
        I.forceClick(this.dateSetUp);
        I.wait(2);
        I.fillField(this.hearingListDay, listDay);
        I.fillField(this.hearingListMonth, listMonth);
        I.fillField(this.hearingListYear, listYear);
        I.click(this.submitHearingButton);
        break;

    }
  },
  async updateHearing() {
    I.wait(5);
    I.see('Hearing Details');
    //let option = I.grabTextFrom('select option:nth-child(2)');
    I.selectOption(this.selectHearing, 1);
    //I.selectOption(this.selectHearing, 'Hearing 1, 27 March 2024 00:00');
    I.click(this.submitHearingButton);
    // Verifying the Hearings Tab.
    I.wait(10);
    I.selectOption(this.hearingStatus, 'Heard');
    I.waitForText('Hearing Status', 10);
    I.checkOption(this.disposePartOfCase);
    I.fillField('#hearingDetailsTimingStart-day', previousDay);
    I.fillField('#hearingDetailsTimingFinish-day', currentDay);
    I.click(this.submitHearingButton);
    I.waitForText('has been updated with event: Hearing Details', 15);
  },
};
