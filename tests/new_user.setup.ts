import {test as setup, expect} from "@playwright/test";
import {mkdir} from "node:fs/promises";
import {HomePage} from "../pages/home.page.js"
import {createUser} from "../utils/user.factory.js"

const authFile = ".auth/new_user.json"

setup("register new user and save auth state", async ({page}) => {
    await mkdir(".auth", {recursive: true})

    const home = new HomePage(page);
    await home.open()

    const registerPage = await home.header.goToRegister();
    const user = createUser();
    await registerPage.register(user);

    await expect(registerPage.successMessage).toBeVisible();
    await expect(home.header.logoutLink).toBeVisible();

    await page.context().storageState({path: authFile})
})
