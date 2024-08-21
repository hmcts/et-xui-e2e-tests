import { expect, Locator, Page } from '@playwright/test';
import axios from 'axios';
import { BasePage } from './basePage';
import { params } from "../utils/config";

const chance = require('chance');
const aatUrl = params.TestUrlForManageCaseAAT;

export default class LoginPage extends BasePage{
  elements={
    username: this.page.locator('#username'),
    password: this.page.locator('#password'),
    submit:this.page.locator('[type="submit"]')
  };



  // async registerNewAccount() {
  //   try {
  //     let firstName = chance.first();
  //     let lastName = chance.last();
  //     let lastFour = chance.ssn({ ssnFour: true });
  //     let emailAddress = firstName + '.' + lastName + lastFour + '@email.com';
  //     let idamData = JSON.stringify({
  //       forename: firstName,
  //       surname: lastName,
  //       email: emailAddress,
  //       password: params.TestEnvETPassword,
  //       active: true,
  //       roles: [
  //         {
  //           code: 'citizen',
  //         },
  //       ],
  //     });
  //     let headers = {
  //       'Content-Type': 'application/json',
  //     };
  //     console.log('url:', aatUrl);
  //     console.log('data:', idamData);
  //     let idamResponse = await axios.post(aatUrl, idamData, { headers });
  //     console.log('Response:', idamResponse.data);
  //     console.log('.... completed account registration');
  //     expect(idamResponse.status).toBe(201);
  //     return {
  //       email: idamResponse.data.email,
  //       firstName: idamResponse.data.forename,
  //       lastName: idamResponse.data.surname,
  //     };
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
  //
  // async processLoginWithNewAccount() {
  //   let email = await this.registerNewAccount();
  //   console.log('.... checking email address:', email);
  //   await this.elements.username.fill(email);
  //   await this.elements.password.fill(params.TestEnvETPassword);
  //   await this.elements.submit.click();
  // }

  async processLogin(username: string, password: string) {
    await this.elements.username.fill(username);
    await this.elements.password.fill(password);
    await this.elements.submit.click();
  }

}
