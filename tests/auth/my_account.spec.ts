import {test, expect} from "./fixtures.js"

test("auth: user can open 'My account' page", async ({homePage}) => {
    const accountPage = await homePage.header.goToMyAccount();

    await expect(accountPage.firstNameInput).toBeVisible();
    await expect(accountPage.lastNameInput).toBeVisible();
    await expect(accountPage.saveButton).toBeVisible();
})