import { mergeTests } from '@playwright/test';
import { pageFixtures } from './page.fixture';
import { stepFixtures } from './step.fixture';
import { allyTest } from './axe-fixture';
import { CcdApi } from '../data-utils/api/CcdApi.ts';
import { CuiApi } from '../data-utils/api/CuiApi.ts';

export const test = mergeTests(pageFixtures, stepFixtures, allyTest);
export const ccdApi = new CcdApi();
export const cuiApi = new CuiApi();
