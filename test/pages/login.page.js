const { I } = inject();

module.exports = {
  processLogin(test_case_username, test_case_password) {
    I.waitForVisible('#username', 15);
    I.fillField('#username', test_case_username);
    I.fillField('#password', test_case_password);
    //I.wait(3);
    I.click('[type="submit"]');
    I.wait(10);
  },
};
