import {test as setup, expect} from "@playwright/test"

setup("Create customer 01 auth", async ({page, context}) =>{
    const email = "customer@practicesoftwaretesting.com"
    const password = "welcome01"
    const customer01AuthFile = ".auth/customer01.json" // credentials or cookies will be saved here

    await page.goto('https://practicesoftwaretesting.com/auth/login');

    //fill email
    await page.getByTestId("email").fill(email);
    //fill password
    await page.getByTestId("password").fill(password);
    //submit button
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');
    await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
    await context.storageState({ path : customer01AuthFile});
})