import {test as StepFactory } from '@playwright/test';
import { BundleSteps } from '../steps/bundleSteps';
import CreateCaseStep from '../steps/createAndAcceptCase';
import  ReferralSteps from '../steps/referralSteps';


export type StepFixtures = {

    createCaseStep: CreateCaseStep;
    bundleSteps: BundleSteps;
    referralSteps: ReferralSteps;
}

export const stepFixtures = {

    createCaseStep: async ({ page }, use) => {
        await use(new CreateCaseStep(page));
    },

    bundleSteps: async ({ page }, use) => {
        await use(new BundleSteps(page));
    },

    referralSteps: async ({ page }, use) => {
        await use(new ReferralSteps(page));
    }
    
};