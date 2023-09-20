const { I } = inject();

module.exports = {
  notification_tab2: '[aria-posinset="11"]',
  notification_link: 'Send a notification',
  respondtoAnOrderOrNotificationLink: 'Respond to an order or request from the tribunal',
  caseFlagsTab: '[aria-posinset="12"]',
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
  }

};
