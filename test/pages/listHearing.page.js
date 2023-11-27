const { I } = inject();
const today = new Date();
const listDay = today.getDate();
const listMonth = today.getMonth() + 1;
const listYear = today.getFullYear();

module.exports = {
  hearingElement: '#hearingCollection',
  hearingNumber: '#hearingCollection_0_hearingNumber',
  //hearingOption: '#hearingCollection_0_Hearing_type',
  hearingOption: 'ccd-field-write:nth-of-type(2) .form-control',
  hearingFormatOption: '//input[@value="In person"]',
  hearingHybridOption: '#hearingCollection_0_hearingFormat-Hybrid',
  hearingVenueOption: '#hearingCollection_0_Hearing_venue',
  hearingLengthNum: '#hearingCollection_0_hearingEstLengthNum',
  dayHourMinutes: 'ccd-field-write:nth-of-type(12) .form-control',
  sitAlonePanel: '#hearingCollection_0_hearingSitAlone-Sit Alone',
  fullPanel: '#hearingCollection_0_hearingSitAlone-Full Panel',
  hearingStage: '#hearingCollection_0_Hearing_stage',
  hearingNotes: '#hearingCollection_0_Hearing_notes',
  dateSetUp: '#hearingCollection_0_hearingDateCollection > div > button',
  hearingListDay: '#listedDate-day',
  hearingListMonth: '#listedDate-month',
  hearingListYear: '#listedDate-year',
  submitHearingButton: '[type="submit"]',


  async listCase() {
    I.see('Case Number');
    I.fillField(this.hearingNumber, '1');
    // hearing format
    I.checkOption(this.hearingHybridOption);
    //hearing type
    I.selectOption(this.hearingOption, 'Expenses/Wasted Costs Hearing');
    I.selectOption(this.hearingVenueOption, '1');
    I.fillField(this.hearingLengthNum, '1');
    I.selectOption(this.dayHourMinutes,'1: Days');
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
    // Verifying the Hearings Tab.
    I.waitForText('has been updated with event: List Hearing', 5);

  }
}