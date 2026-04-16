import { expect, Locator, Page } from '@playwright/test';
import axios from 'axios';
import { BasePage } from './basePage';
import config from '../config/config';
import { faker } from '@faker-js/faker';

const aatUrl = config.manageCaseBaseUrl;
const idamUrl = config.idamUrl;

declare global {
  var newUserEmail: string;
}

export default class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit = page.locator('[type="submit"]');
  }

  async registerNewAccount() {
    try {
      let firstName = faker.person.firstName();
      let lastName = faker.person.lastName();
      var lastFour = Math.floor(1000 + Math.random() * 9000);
      let emailAddress = firstName + '.' + lastName + lastFour + '@justice.gov.uk';
      let idamData = JSON.stringify({
        forename: firstName,
        surname: lastName,
        email: emailAddress,
        password: config.etCaseWorker.password,
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
      console.log('url:', idamUrl);
      console.log('data:', idamData);
      let idamResponse = await axios.post(idamUrl, idamData, { headers });
      console.log('Response:', idamResponse.data);
      console.log('.... completed account registration');
      expect(idamResponse.status).toBe(201);
      global.newUserEmail = idamResponse.data.email;
      return global.newUserEmail;
    } catch (error) {
      return "ERROR occurred creating new User "+error;
    }
  }

  async processLoginWithNewAccount() {
    global.newUserEmail = await this.registerNewAccount();
    console.log('.... checking email address:', global.newUserEmail);
    await this.username.fill(global.newUserEmail);
    await this.password.fill(config.etCaseWorker.password);
    await this.submit.click();
  }

  async processLogin(username: string, password: string, requiredPath: string = config.loginPaths.worklist, baseUrl : string = aatUrl) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
    await this.page.waitForURL(`${baseUrl}${requiredPath}`, { timeout: 20000 });
  }

  async processLoginCitizenUi(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
