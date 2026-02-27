import {test, expect} from "../fixtures.js";


test("auth: user is logged in", async ({homePage})=> {
    await homePage.open()
    await expect(homePage.header.logoutLink).toBeVisible()
})