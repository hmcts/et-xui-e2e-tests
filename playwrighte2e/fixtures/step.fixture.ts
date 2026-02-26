import { test as base } from '@playwright/test';
import ReferralSteps from '../steps/referralSteps';
import ET3ProcessingSteps from '../steps/et3ProcessingSteps';
import AccessibilitySteps from '../steps/accessibilitySteps';

export type StepFixtures = {
  referralSteps: ReferralSteps;
  et3ProcessingSteps: ET3ProcessingSteps;
  accessibilitySteps: AccessibilitySteps;
};

export const stepFixtures = base.extend<StepFixtures>({

  referralSteps: async ({ page }, use) => {
    await use(new ReferralSteps(page));
  },

  et3ProcessingSteps: async ({ page }, use) => {
    await use(new ET3ProcessingSteps(page));
  },

  accessibilitySteps: async ({ page }, use) => {
    await use(new AccessibilitySteps(page));
  },
});
