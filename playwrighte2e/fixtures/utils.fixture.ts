import { test as base } from '@playwright/test';
import { CookieUtils } from '../data-utils/cookie.utils';
import { SessionUtils } from '@hmcts/playwright-common';

export type UtilFixtures = {
  cookieUtils: CookieUtils;
};

export const utilFixtures = base.extend<UtilFixtures>({
  cookieUtils: async ({}, use) => {
    await use(new CookieUtils());
 },
});
