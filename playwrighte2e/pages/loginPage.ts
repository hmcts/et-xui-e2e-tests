import { expect, Locator, Page } from '@playwright/test';
import axios from 'axios';
import { BasePage } from './basePage';
import config from '../config/config';
import { faker } from '@faker-js/faker';
import { UserCredentials } from '../config/config.dynamic.ts';
import { CookieUtils } from '../data-utils/cookie.utils.ts';

const aatUrl = config.manageCaseBaseUrl;

export default class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly submit: Locator;
  readonly signOutLink: Locator;

  constructor(page: Page) {
    super(page);
    // given different locators for handling new and Old IDAM UI changes
    this.username = page.locator('[data-testid="idam-username-input"], #username, input[name="username"], input[type="email"]');
    this.password = page.locator('[data-testid="idam-password-input"], #password, input[name="password"], input[type="password"]');
    this.submit = page.locator('[data-testid="idam-submit-button"], [name="save"], button[type="submit"], input[type="submit"]');
    this.signOutLink = page.locator(`//a[normalize-space()='Sign out']`)
  }

  async processLogin(user: UserCredentials, baseUrl : string = aatUrl) {
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState('load');
    if (await this.signOutLink.count() > 0 || await this.username.count() === 0) {
      return;
    }
    await this.username.fill(user.email);
    await this.password.fill(user.password);
    await this.submit.click();
    await this.page.waitForURL(new RegExp(baseUrl), { timeout: 10000 });
    await this.saveSession(user.sessionFile);
    await CookieUtils.addSessionFreshnessCookie(user.sessionFile, baseUrl);
  }

  async saveSession(sessionFile: string): Promise<void> {
    await this.page.context().storageState({ path: sessionFile });
  }
}
