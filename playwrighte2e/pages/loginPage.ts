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
    // given different locators for handling new and Old IDAM UI changes
    this.username = page.locator('[data-testid="idam-username-input"], #username, input[name="username"], input[type="email"]');
    this.password = page.locator('[data-testid="idam-password-input"], #password, input[name="password"], input[type="password"]');
    this.submit = page.locator('[data-testid="idam-submit-button"], [name="save"], button[type="submit"], input[type="submit"]');
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

  async saveSession(sessionFile: string): Promise<void> {
    await this.page.context().storageState({ path: sessionFile });
  }
}
