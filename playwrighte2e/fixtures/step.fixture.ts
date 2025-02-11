import {test as StepFactory } from '@playwright/test';
import { BundleSteps } from '../steps/bundleSteps';
import CreateCaseStep from '../steps/createAndAcceptCase';


export type StepFixtures = {

    createCaseStep: CreateCaseStep;
    bundleSteps: BundleSteps;
}

export const stepFixtures = {

    createCaseStep: async ({ page }, use) => {
        await use(new CreateCaseStep(page));
    }, 
    bundleSteps: async ({ page }, use) => {
        await use(new BundleSteps(page));
    }
    
};