import { BasePage } from "./basePage";
import depositOrderData from '../data/ui-data/deposit-order-content.json';

export default class DepositOrderPage extends BasePage {

    elements = {
        depositAmnt: '#depositType_0_Deposit_amount',
        depositOrderAgainst: '#depositType_0_dynamicDepositOrderAgainst',
        depositOrderRequestedBy: '#depositType_0_dynamicDepositRequestedBy',
        depositCover: '#depositType_0_deposit_covers',
        depositOrderSentDay: '#deposit_order_sent-day',
        depositOrderSentMonth: '#deposit_order_sent-month',
        depositOrderSentYear: '#deposit_order_sent-year',
        depositDueDay: '#deposit_due-day',
        depositDueMonth: '#deposit_due-month',
        depositDueYear: '#deposit_due-year',
        depositTimeExtNo: '#depositType_0_deposit_time_ext_No',
        depositReceivedNo: '#depositType_0_depositReceived_No',
        depositRefundNo: '#depositType_0_deposit_refund_No',
        depositNotes: '#depositType_0_depositNotes'
    }

    async submitADepositOrder() {
        await this.webActions.verifyElementContainsText(this.page.locator('[for="depositType_0_Deposit_amount"] span'), 'Deposit amount (£)');
        await this.webActions.fillField(this.elements.depositAmnt, depositOrderData.depositAmount);
        await this.webActions.selectByLabelFromDropDown(this.elements.depositOrderAgainst, depositOrderData.respondentName);
        await this.webActions.selectByLabelFromDropDown(this.elements.depositOrderRequestedBy, depositOrderData.claimantName);
        await this.webActions.selectByLabelFromDropDown(this.elements.depositCover, depositOrderData.coverTypeAll);

        await this.webActions.fillField(this.elements.depositOrderSentDay, '3');
        await this.webActions.fillField(this.elements.depositOrderSentMonth, '3');
        await this.webActions.fillField(this.elements.depositOrderSentYear, '2025');

        await this.webActions.fillField(this.elements.depositDueDay, '2');
        await this.webActions.fillField(this.elements.depositDueMonth, '3');
        await this.webActions.fillField(this.elements.depositDueYear, '2025');

        await this.webActions.clickElementByCss(this.elements.depositTimeExtNo);
        await this.webActions.clickElementByCss(this.elements.depositReceivedNo);
        await this.webActions.clickElementByCss(this.elements.depositRefundNo);

        await this.webActions.fillField(this.elements.depositNotes, depositOrderData.depositNote);
        await this.clickSubmitButton();
    }

}
