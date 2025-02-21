import { Page } from 'playwright';
import { BasePage } from './basePage';
import dateUtilComponent from '../utils/DateUtilComponent';

const today = new Date();
const listDay = today.getDate() + 1;
const currentDay = today.getDate();
const previousDay = today.getDate() - 1;
const listMonth = today.getMonth() + 1;
const previousMonth = today.getMonth();
const listYear = today.getFullYear();

export class ListHearingPage extends BasePage {
    // private page: Page;

    // constructor(page: Page) {
    //     this.page = page;
    // }

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

    async listCase(location: string, hearingNumber?: number, newcastleHearing:boolean) {

        //To always choose weekdays for hearing dates
        const today = new Date();
        const resultDate = dateUtilComponent.addWeekdays(today, 21);

        switch (location) {
            case 'EnglandWales':
                (hearingNumber == 2) ? await this.addNewHearingButtonClick() : 'Don\'t add new hearing';
                (hearingNumber == 2) ? await this.page.waitForSelector(this.secondHearingNumber, { timeout: 10000 }) : await this.page.waitForSelector(this.hearingNumberEle, { timeout: 10000 });
                (hearingNumber == 2) ? await this.page.fill(this.secondHearingNumber, '2') : await this.page.fill(this.hearingNumberEle, '1');
                (hearingNumber == 2) ? await this.page.check(this.secondHearingHybridOption) : await this.page.check(this.hearingHybridOption);
                (hearingNumber == 2) ? await this.page.selectOption(this.secondHearingOption, '1: Costs Hearing') : await this.page.selectOption(this.hearingOption, '1: Costs Hearing');
                (hearingNumber == 2) ? await this.page.check(this.secondJudicialMediationOption) : await this.page.check(this.judicialMediationOption);
                if(newcastleHearing){
                    (hearingNumber == 2) ? await this.page.selectOption(this.secondHearingVenueOption, {index: 1}) : await this.page.selectOption(this.hearingVenueOption, 'Newcastle CFCTC');
                }else{
                    (hearingNumber == 2) ? await this.page.selectOption(this.secondHearingVenueOption, {index: 1}) : await this.page.selectOption(this.hearingVenueOption, {index: 1});
                }
                (hearingNumber == 2) ? await this.page.fill(this.secondHearingLengthNum, '1') : await this.page.fill(this.hearingLengthNum, '1');
                (hearingNumber == 2) ? await this.page.selectOption(this.secondDayHourMinutes, '1: Days') : await this.page.selectOption(this.dayHourMinutes, '1: Days');
                (hearingNumber == 2) ? await this.page.check(this.secondSitAlonePanel) : await this.page.check(this.sitAlonePanel);
                (hearingNumber == 2) ? await this.page.selectOption(this.secondHearingStage, '1: Stage 1') : await this.page.selectOption(this.hearingStage, '1: Stage 1');
                (hearingNumber == 2) ? await this.page.click(this.secondDateSetUp) : await this.page.click(this.dateSetUp);
                await this.page.waitForTimeout(2000);
                console.log(`... setting up hearing date ${resultDate.getDate()}`);
                (hearingNumber == 2) ? await this.page.fill(this.secondHearingListDay, '6') : await this.page.fill(this.hearingListDay, `${resultDate.getDate()}`);
                (hearingNumber == 2) ? await this.page.fill(this.secondHearingListMonth, '1') : await this.page.fill(this.hearingListMonth, listMonth.toString());
                (hearingNumber == 2) ? await this.page.fill(this.secondHearingListYear, '2025') : await this.page.fill(this.hearingListYear, listYear.toString());
                await this.page.waitForTimeout(2000);
                (hearingNumber == 2) ? await this.page.fill(this.secondHearingNotes, 'The hearing should be help as soon as possible....') : await this.page.fill(this.hearingNotes, 'The hearing should be help as soon as possible....');
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.page.locator(this.submitHearingButton).click();

                if(hearingNumber == 2) {
                    await this.page.locator('h3:has-text("One of the listed dates are in the past.")').isVisible();
                    await this.page.locator(this.submitHearingButton).click();
                }
                break;
            case 'Scotland':
                await this.page.waitForSelector(this.hearingNumberEle, { timeout: 10000 });
                await this.page.fill(this.hearingNumberEle, '01');
                await this.page.selectOption(this.hearingTypeOption, '1: Expenses/Wasted Costs Hearing');
                await this.page.check(this.hearingHybridOption);
                await this.page.check(this.judicialMediationOption);
                await this.page.selectOption(this.managingOffice, '1: Glasgow');
                await this.page.selectOption(this.hearingVenueOptionScotland, '4: Glasgow COET');
                await this.page.fill(this.hearingLengthNum, '1');
                await this.page.selectOption(this.dayHourMinutes, '1: Days');
                await this.page.check(this.sitAlonePanel);
                await this.page.selectOption(this.hearingStage, '1: Stage 1');
                await this.page.click(this.dateSetUp);
                await this.page.waitForTimeout(2000);
                await this.page.fill(this.hearingListDay, `${resultDate.getDate()}`);
                await this.page.fill(this.hearingListMonth, listMonth.toString());
                await this.page.fill(this.hearingListYear, listYear.toString());
                await this.page.waitForTimeout(2000);
                await this.page.fill(this.hearingNotes, 'The hearing should be help as soon as possible....');
                await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
                await this.page.locator(this.submitHearingButton).click();
                break;
            default:
                throw new Error('... check your options or add new option');
        }
        await this.page.waitForSelector(this.completionSuccessMessage, { timeout: 10000 });
        await this.page.waitForSelector('text=has been updated with event: List Hearing');
    }

    async updateHearing() {
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector('text=Hearing Details');
        await this.page.selectOption(this.selectHearing, '1');
        await this.page.click(this.submitHearingButton);
        await this.page.waitForTimeout(10000);
        await this.page.selectOption(this.hearingStatus, 'Heard');
        await this.page.waitForSelector('text=Hearing Status', { timeout: 10000 });
        await this.page.check(this.disposePartOfCase);
        await this.page.fill('#hearingDetailsTimingStart-day', previousDay.toString());
        await this.page.fill('#hearingDetailsTimingFinish-day', currentDay.toString());
        await this.page.click(this.submitHearingButton);
        await this.page.waitForSelector('text=has been updated with event: Hearing Details', { timeout: 15000 });
    }

}
