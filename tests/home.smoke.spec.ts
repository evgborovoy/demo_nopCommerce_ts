import {test, expect} from "./fixtures.js"


test("home: header links are visible", async ({homePage}) => {
    await homePage.open()

    await expect(homePage.header.registerLink).toBeVisible();
    await expect(homePage.header.loginLink).toBeVisible();
    await expect(homePage.searchInput).toBeVisible();

})