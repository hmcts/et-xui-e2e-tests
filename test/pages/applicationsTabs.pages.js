const { I } = inject();

module.exports = {
  notification_tab2: '[aria-posinset="11"]',
  notification_link: 'Send a notification',
  respondtoAnOrderOrNotificationLink: 'Respond to an order or request from the tribunal',
  caseFlagsTab: '.mat-tab-label-container > .mat-tab-list > .mat-tab-labels > #mat-tab-label-0-10 > .mat-tab-label-content',
  caseFileViewTab: '//div[12]',
  caseFileViewElement: '#case-file-view',
  searchDocumentFromCaseFileView: '#document-search',
  uncategorisedDocument: '//span[.="Uncategorised documents"]',

  //caption[.='Alexa Siri']

  selectNotificationLink() {
    I.waitForElement(this.notification_tab2, 20);
    I.click(this.notification_tab2);
    I.click(this.notification_link);
  },

  SendNotification() {
    I.click(this.notification_link);
  },

  respondtoAnOrderOrNotification() {
    I.click(this.respondtoAnOrderOrNotificationLink);
  },

  selectCaseFlagTabs() {
    I.click(this.caseFlagsTab);
    I.see('Alexa Siri');
    I.see('Henry Marsh');
    I.see('Case level flags');
  },

  selectCaseFileView() {
    I.waitForElement(this.caseFileViewTab,20)
    I.forceClick(this.caseFlagsTab);
    I.waitForElement(this.caseFileViewElement, 25)
    I.see('Case file');
    I.seeElement(this.searchDocumentFromCaseFileView);
    // I.seeElement(this.uncategorisedDocument);
  },
};
