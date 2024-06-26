const { I } = inject();

module.exports = {
  notification_tab2:
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Notifications"]',
  notification_link: 'Send a notification',
  respondToNotificationLink: 'Respond to an order or request from the tribunal',
  caseFlagsTab:
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Case File View"]',
  caseFileViewTab:
    '//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Case File View"]',
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
    I.click(this.respondToNotificationLink);
  },

  selectCaseFlagTabs() {
    I.click(this.caseFlagsTab);
    I.see('Alexa Siri');
    I.see('Henry Marsh');
    I.see('Case level flags');
  },

  selectCaseFileView() {
    I.waitForElement(this.caseFileViewTab, 20);
    I.forceClick(this.caseFlagsTab);
    I.waitForElement(this.caseFileViewElement, 25);
    I.see('Case file');
    I.seeElement(this.searchDocumentFromCaseFileView);
    // I.seeElement(this.uncategorisedDocument);
  },
};
