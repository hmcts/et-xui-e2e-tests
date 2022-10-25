Feature('End To End Tests For an ET Case Submitted in the sya Front end and processed in the Manage Case Application');
Scenario('Make Draft Application', async ({ I, basePage }) => {
  I.amOnPage('/');
  await basePage.processPreLoginPagesForTheDraftApplication();
}).tag('@RET-BAT');
