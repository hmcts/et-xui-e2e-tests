import { Page } from '@playwright/test';
import { BaseStep } from "./base";

export default class ET3ProcessingSteps extends BaseStep {

     constructor(page: Page) {
              super(page);
    }

    async fillET3Values() {
        await this.respondentRepPage.enterRespType();
    }

  async fillET3ValuesForIC() {
    await this.respondentRepPage.enterRespTypeforIC();
  }

    async processET3() {
        await this.et3ProcessPage.submitET3Response();
    }
}