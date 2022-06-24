const { I } = inject();

module.exports = {
  nonhearingText: 'Non Hearing Judgment?',
  nonHearingJudgmentYesOption: '#judgementCollection_0_non_hearing_judgment_Yes',
  nonHearingJudgementNoOption: '#judgementCollection_0_non_hearing_judgment_No',
  optionalHearingDetails: '#judgementCollection_0_dynamicJudgementHearing',
  judgementTypeDropdown: '#judgementCollection_0_judgement_type',
  liabilityDropdown: '#judgementCollection_0_liability_optional',
  jurisdictionText: 'Jurisdiction',
  addNewJurisdictionButton: '[class="button"]',
  addNewJurisdictionDropdown: 'judgementCollection_0_jurisdictionCodes_0_juridictionCodesList',
  judgementMadeDay: '#date_judgment_made-day',
  judgementMadeMonth: '#date_judgment_made-month',
  judgmentMadeYear: '#date_judgment_made-year',
  judgementSentDay: '#date_judgment_sent-day',
  judgmentSentMonth: '#date_judgment_sent-month',
  judgmentSentYear: '#date_judgment_sent-year',
  submitJudgeCollectionButton: '[type="submit"]',

  async fillJurisdictiondata(hearing_details, judgementOption, jurisdictionOption) {
    await I.waitForEnabled(this.judgementTypeDropdown, 45);
    await I.checkOption(this.nonHearingJudgementNoOption);
    await I.selectOption(this.optionalHearingDetails, hearing_details);
    await I.selectOption(this.judgementTypeDropdown, judgementOption);
    await I.click(this.addNewJurisdictionButton);
    await I.selectOption(this.addNewJurisdictionDropdown, jurisdictionOption);
  },

  async fillJudgementMadeDates(day, month, year) {
    await I.fillField(this.judgementMadeDay, day);
    await I.fillField(this.judgementMadeMonth, month);
    await I.fillField(this.judgmentMadeYear, year);
  },

  async fillJudgementSentDates(day, month, year) {
    await I.fillField(this.judgementSent, day);
    await I.fillField(this.judgementSentMonth, month);
    await I.fillField(this.judgmentSentYear, year);
  },

  async submitForm() {
    await I.click(this.submitJudgeCollectionButton);
  },
};
