import { mergeTests } from '@playwright/test';
import { pageFixtures } from './page.fixture';
import { stepFixtures } from './step.fixture';
import { allyTest } from './axe-fixture';

export const test = mergeTests(pageFixtures, stepFixtures, allyTest);
