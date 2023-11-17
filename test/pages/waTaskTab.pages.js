const { I } = inject();

module.exports = {

  et1VettingLink: '//a[contains(.,"ET1 Vetting")]',

  verifyWAtaskTabPage() {
    I.waitForElement(this.et1VettingLink, 20);
    I.click(this.et1VettingLink);
  },
};

