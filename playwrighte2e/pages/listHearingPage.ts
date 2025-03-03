import { Page } from 'playwright';
import { BasePage } from './basePage';
import dateUtilComponent from '../utils/DateUtilComponent';

const today = new Date();
const listDay = today.getDate() + 1;
const currentDay = today.getDate();
const previousDay = today.getDate() - 1;
const listMonth = today.getMonth() + 2;
const previousMonth = today.getMonth();
const listYear = today.getFullYear();

export class ListHearingPage extends BasePage {

    hearingElement = '#hearingCollection';
    hearingNumberEle = '#hearingCollection_0_hearingNumber';
    secondHearingNumber = '#hearingCollection_1_hearingNumber';
    hearingTypeOption = '#hearingCollection_0_Hearing_type';
    hearingOption = '#hearingCollection_0_Hearing_type';
    secondHearingOption = '#hearingCollection_1_Hearing_type';
    hearingFormatOption = '//input[@value="In person"]';
    hearingHybridOption = '#hearingCollection_0_hearingFormat-Hybrid';
    secondHearingHybridOption = '#hearingCollection_1_hearingFormat-Hybrid';
    judicialMediationOption = '#hearingCollection_0_judicialMediation_No';
    secondJudicialMediationOption = '#hearingCollection_1_judicialMediation_No';
    hearingVenueOption = '#hearingCollection_0_Hearing_venue';
    secondHearingVenueOption = '#hearingCollection_1_Hearing_venue';
    managingOffice = '#hearingCollection_0_Hearing_venue_Scotland';
    hearingVenueOptionScotland = '#hearingCollection_0_Hearing_Glasgow';
    hearingLengthNum = '#hearingCollection_0_hearingEstLengthNum';
    secondHearingLengthNum = '#hearingCollection_1_hearingEstLengthNum';
    dayHourMinutes = '#hearingCollection_0_hearingEstLengthNumType';
    secondDayHourMinutes = '#hearingCollection_1_hearingEstLengthNumType';
    sitAlonePanel = '#hearingCollection_0_hearingSitAlone-Sit\\ Alone';
    secondSitAlonePanel = '#hearingCollection_1_hearingSitAlone-Sit\\ Alone';
    fullPanel = '#hearingCollection_0_hearingSitAlone-Full Panel';
    hearingStage = '#hearingCollection_0_Hearing_stage';
    secondHearingStage = '#hearingCollection_1_Hearing_stage';
    hearingNotes = '#hearingCollection_0_Hearing_notes';
    secondHearingNotes = '#hearingCollection_1_Hearing_notes';
    dateSetUp = '#hearingCollection_0_hearingDateCollection > div > button';
    secondDateSetUp = '#hearingCollection_1_hearingDateCollection > div > button';
    hearingListDay = '#listedDate-day';
    secondHearingListDay = '(//*[@id="listedDate-day"])[2]';
    hearingListMonth = '#listedDate-month';
    secondHearingListMonth = '(//*[@id="listedDate-month"])[2]';
    hearingListYear = '#listedDate-year';
    secondHearingListYear = '(//*[@id="listedDate-year"])[2]';
    submitHearingButton = '//button[@type="submit"]';
    selectHearing = '#hearingDetailsHearing';
    hearingStatus = '#hearingDetailsCollection_0_hearingDetailsStatus';
    disposePartOfCase = '#hearingDetailsCollection_0_hearingDetailsCaseDisposed_No';
    completionSuccessMessage = '//div[@class="alert-message"]';

    async listCase(location: string, hearingNumber?: number, newcastleHearing?: boolean) {

        //To always choose weekdays for hearing dates
        const today = new Date();
        const resultDate = dateUtilComponent.addWeekdays(today, 21);

        switch (location) {
            case 'EnglandWales':
                (hearingNumber == 2) ? await this.addNewHearingButtonClick() : 'Don\'t add new hearing';
                (hearingNumber == 2) ? await this.webActions.verifyElementToBeVisible(this.page.locator(this.secondHearingNumber), 10000) : await this.webActions.verifyElementToBeVisible(this.page.locator(this.hearingNumberEle), 10000);
                (hearingNumber == 2) ? await this.webActions.fillField(this.secondHearingNumber, '2') : this.webActions.fillField(this.hearingNumberEle, '1');
                (hearingNumber == 2) ? await this.webActions.checkElementById(this.secondHearingHybridOption) : await this.webActions.checkElementById(this.hearingHybridOption);
                (hearingNumber == 2) ? await this.webActions.selectByOptionFromDropDown(this.secondHearingOption, '1: Costs Hearing') : await this.webActions.selectByOptionFromDropDown(this.hearingOption, '1: Costs Hearing');
                (hearingNumber == 2) ? await this.webActions.checkElementById(this.secondJudicialMediationOption) : await this.webActions.checkElementById(this.judicialMediationOption);

                if(newcastleHearing){
                    (hearingNumber == 2) ? await this.page.selectOption(this.secondHearingVenueOption, {index: 1}) : await this.page.selectOption(this.hearingVenueOption, 'Newcastle CFCTC');
                }else{
                    (hearingNumber == 2) ? await this.page.selectOption(this.secondHearingVenueOption, {index: 1}) : await this.page.selectOption(this.hearingVenueOption, {index: 1});
                }
                (hearingNumber == 2) ? await this.webActions.fillField(this.secondHearingLengthNum, '1') : await this.webActions.fillField(this.hearingLengthNum, '1');
                (hearingNumber == 2) ? await this.webActions.selectByOptionFromDropDown(this.secondDayHourMinutes, '1: Days') : await this.webActions.selectByOptionFromDropDown(this.dayHourMinutes, '1: Days');
                (hearingNumber == 2) ? await this.webActions.checkElementById(this.secondSitAlonePanel) : await this.webActions.checkElementById(this.sitAlonePanel);
                (hearingNumber == 2) ? await this.webActions.selectByOptionFromDropDown(this.secondHearingStage, '1: Stage 1') : await this.webActions.selectByOptionFromDropDown(this.hearingStage, '1: Stage 1');
                (hearingNumber == 2) ? await this.webActions.clickElementByCss(this.secondDateSetUp) : await this.webActions.clickElementByCss(this.dateSetUp);

                await this.page.waitForTimeout(2000);
                console.log(`... setting up hearing date ${resultDate.getDate()}`);
                (hearingNumber == 2) ? await this.webActions.fillField(this.secondHearingListDay, '6') : await this.webActions.fillField(this.hearingListDay, `${resultDate.getDate()}`);
                (hearingNumber == 2) ? await this.webActions.fillField(this.secondHearingListMonth, '1') : await this.webActions.fillField(this.hearingListMonth, listMonth.toString());
                (hearingNumber == 2) ? await this.webActions.fillField(this.secondHearingListYear, '2025') : await this.webActions.fillField(this.hearingListYear, listYear.toString());

                await this.page.waitForTimeout(2000);
                (hearingNumber == 2) ? await this.webActions.fillField(this.secondHearingNotes, 'The hearing should be help as soon as possible....') : await this.webActions.fillField(this.hearingNotes, 'The hearing should be help as soon as possible....');

                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.webActions.clickElementByCss(this.submitHearingButton);

                if(hearingNumber == 2) {
                    await this.webActions.verifyElementToBeVisible(this.page.locator('h3:has-text("One of the listed dates are in the past.")'));
                    await this.webActions.clickElementByCss(this.submitHearingButton);
                }
                break;
            case 'Scotland':
                await this.webActions.verifyElementToBeVisible(this.page.locator(this.hearingNumberEle), 10000);
                await this.webActions.fillField(this.hearingNumberEle, '01');
                await this.webActions.selectByOptionFromDropDown(this.hearingTypeOption, '1: Expenses/Wasted Costs Hearing');
                await this.webActions.checkElementById(this.hearingHybridOption);
                await this.webActions.checkElementById(this.judicialMediationOption);
                await this.webActions.selectByOptionFromDropDown(this.managingOffice, '1: Glasgow');
                await this.webActions.selectByOptionFromDropDown(this.hearingVenueOptionScotland, '4: Glasgow COET');
                await this.webActions.fillField(this.hearingLengthNum, '1');
                await this.webActions.selectByOptionFromDropDown(this.dayHourMinutes, '1: Days');
                await this.webActions.checkElementById(this.sitAlonePanel);
                await this.webActions.selectByOptionFromDropDown(this.hearingStage, '1: Stage 1');
                await this.webActions.clickElementByCss(this.dateSetUp);

                await this.page.waitForTimeout(2000);
                await this.webActions.fillField(this.hearingListDay, `${resultDate.getDate()}`);
                await this.webActions.fillField(this.hearingListMonth, listMonth.toString());
                await this.webActions.fillField(this.hearingListYear, listYear.toString());

                await this.page.waitForTimeout(2000);
                await this.webActions.fillField(this.hearingNotes, 'The hearing should be help as soon as possible....');

                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.webActions.clickElementByCss(this.submitHearingButton);
                break;
            default:
                throw new Error('... check your options or add new option');
        }
        await this.webActions.verifyElementToBeVisible(this.page.locator(this.completionSuccessMessage), 10000);
        await this.page.waitForSelector('text=has been updated with event: List Hearing');
    }

    async updateHearing() {
        await this.page.waitForTimeout(5000);
        await this.webActions.verifyElementToBeVisible(this.page.locator('text=Hearing Details'));
        
        await this.page.selectOption(this.selectHearing, '1');
        await this.webActions.clickElementByCss(this.submitHearingButton);

        await this.page.waitForTimeout(10000);
        await this.webActions.selectByLabelFromDropDown(this.hearingStatus, 'Heard');
        await this.webActions.verifyElementToBeVisible(this.page.locator('text=Hearing Status'), 10000);
        await this.webActions.checkElementById(this.disposePartOfCase);
        await this.webActions.fillField('#hearingDetailsTimingStart-day', previousDay.toString());
        await this.webActions.fillField('#hearingDetailsTimingFinish-day', currentDay.toString());
        await this.webActions.clickElementByCss(this.submitHearingButton);
        await this.webActions.verifyElementToBeVisible(this.page.locator('text=has been updated with event: Hearing Details'), 15000);
    }

}
