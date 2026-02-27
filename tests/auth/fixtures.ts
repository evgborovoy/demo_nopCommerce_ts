import {test as base, expect} from "@playwright/test"
import {HomePage} from "../../pages/home.page.js";

type AuthFixtures = {
    homePage: HomePage;
}

export const test = base.extend<AuthFixtures>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
});


test.beforeEach(async ({homePage}) => {
    await homePage.open();
    await expect(homePage.header.logoutLink).toBeVisible();
});

export {expect};