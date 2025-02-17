import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import dateUtilComponent from "../utils/DateUtilComponent";

const today = new Date();
const restrictedMonth = today.getMonth() + 1;
const restrictedYear = today.getFullYear();

export class RestrictedReportingPage extends BasePage {


    elements = {
        headingEle: '.heading-h2',
        requestedByOption: '#restrictedReporting_dynamicRequestedBy',
        restrictedReportingImposedNo: '#restrictedReporting_imposed_No',
        restrictedReportingRule503bYes: '#restrictedReporting_rule503b_Yes',
        dateCeased: '#dateCeased-day',
        monthCeased: '#dateCeased-month',
        yearCeased: '#dateCeased-year',
        startDate: '#startDate-day',
        monthStartDate: '#startDate-month',
        yearStartDate: '#startDate-year',
        restrictedReportingExcludedRegister: '#restrictedReporting_excludedRegister',
        restrictedReportingExcludedNames: '#restrictedReporting_excludedNames',
        restrictedReportingDeletedPhyRegisterNo: '#restrictedReporting_deletedPhyRegister_No',
    }

    public async selectRule49BOption() {

        //To always choose weekdays for hearing dates
        const today = new Date();
        const resultDate = dateUtilComponent.addWeekdays(today, 21);

        await expect(this.page.locator(this.elements.headingEle)).toHaveText('Restricted Case');
        await this.page.selectOption(this.elements.requestedByOption, 'Grayson Becker');
        await this.page.locator(this.elements.restrictedReportingImposedNo).check();
        await this.page.locator(this.elements.restrictedReportingRule503bYes).check();

        console.log(`... setting up restricted dates ${resultDate.getDate()}`);
        await this.page.fill(this.elements.dateCeased, `${resultDate.getDate()}`);
        await this.page.fill(this.elements.monthCeased, restrictedMonth.toString());
        await this.page.fill(this.elements.yearCeased, restrictedYear.toString());

        await this.page.fill(this.elements.startDate, `${resultDate.getDate()}`);
        await this.page.fill(this.elements.monthStartDate, restrictedMonth.toString());
        await this.page.fill(this.elements.yearStartDate, restrictedYear.toString());


        await this.page.selectOption(this.elements.restrictedReportingExcludedRegister, 'No');
        await this.delay(2000);
        await this.page.fill(this.elements.restrictedReportingExcludedNames, 'Test Name');
        await this.page.locator(this.elements.restrictedReportingDeletedPhyRegisterNo).click();
        await this.submitButton();
    }

    async verifyRule49BFlag(){

        await expect(this.page.getByText('RULE 49(3)b').first()).toBeVisible();
    }
}