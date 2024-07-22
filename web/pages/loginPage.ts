import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from "./basePage.ts"

const axios = require('axios');
const chance = require('chance').Chance();
const testConfig = require('../../config.js');
const aatUrl = testConfig.IdamAcccountUrl;

export default class LoginPage extends BasePage{
    readonly username:Locator
    readonly password:Locator
    readonly submit:Locator
  constructor(page: Page) {
    super(page)
    this.username = this.page.getByLabel('Email address');
    this.password = this.page.getByLabel('password');
    }
  async registerNewAccount() {
    try {
      let firstName = chance.first();
      let lastName = chance.last();
      let lastFour = chance.ssn({ ssnFour: true });
      let emailAddress = firstName + '.' + lastName + lastFour + '@email.com';
      let idamData = JSON.stringify({
        forename: firstName,
        surname: lastName,
        email: emailAddress,
        password: testConfig.TestEnvETPassword,
        active: true,
        roles: [
          {
            code: 'citizen',
          },
        ],
      });
      let headers = {
        'Content-Type': 'application/json',
      };
      console.log('url:', aatUrl);
      console.log('data:', idamData);
      let idamResponse = await axios.post(aatUrl, idamData, { headers });
      console.log('Response:', idamResponse.data);
      console.log('.... completed account registration');
      expect(idamResponse.status).toBe(201);
      return {
        email: idamResponse.data.email,
        firstName: idamResponse.data.forename,
        lastName: idamResponse.data.surname,
      };
    } catch (error) {
      return error.message;
    }
  }

  async processLoginWithNewAccount() {
    //console.log(`${await registerNewAccount()}`);
    const { email } = await this.registerNewAccount();
    await this.username;
    console.log('.... checking email address:', email);
    await this.username.fill(testConfig.TestEnvETCaseWorkerUser);
    await this.password.fill(testConfig.TestEnvETPassword);

  }


}
