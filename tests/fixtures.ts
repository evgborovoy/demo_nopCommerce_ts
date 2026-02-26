import {test as base, expect} from "@playwright/test";
import {HomePage} from "../pages/home.page.js";

type Pages = {
    homePage: HomePage
};

export const test = base.extend<Pages>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
});

export {expect}