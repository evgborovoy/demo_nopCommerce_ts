import {test, expect} from "./fixtures.js"

test("login page: form in visible", async ({homePage}) => {
    await homePage.open()

    const loginPage = await homePage.header.goToLogin()

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
})