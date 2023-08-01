const { I } = inject();

module.exports = {
  content_tab1: '[aria-posinset="10"] > .mat-tab-label-content',
  content_tab2: '[aria-posinset="10"] > .mat-tab-label-content',
  notification_link: 'Send a notification',
  respondtoAnOrderOrNotificationLink: 'Respond to an order or request from the tribunal',

  selectNotificationLink() {
    I.waitForElement(this.content_tab1, 20);
    I.click(this.content_tab2);
    I.click(this.notification_link);
  },

  SendNotification() {
    I.click(this.notification_link);
  },

  respondtoAnOrderOrNotification() {
    I.click(this.respondtoAnOrderOrNotificationLink);
  },
};
