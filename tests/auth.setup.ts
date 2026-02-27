import {test as setup, expect} from "@playwright/test";
import {mkdir} from "node:fs/promises";
import {HomePage} from "../pages/home.page.js";


const authFile = "./auth/user.json"

setup("authenticate", async ({page}) => {
    await mkdir("./auth", {recursive: true});

    const email = process.env.E2E_EMAIL;
    const password = process.env.E2E_PASSWORD;

    if (!email || !password) {
        throw new Error("Set E2E_EMAIL and E2E_PASSWORD in env file");
    }

    const homePage = new HomePage(page)
    await homePage.open()

    const loginPage = await homePage.header.goToLogin();
    await loginPage.login(email, password);

    await expect(homePage.header.logoutLink).toBeVisible();
    await page.context().storageState({path: authFile})
})