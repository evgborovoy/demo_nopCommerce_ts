import {test, expect} from "./fixtures.js"
import {createUser} from "../utils/user.factory.js"

test("register: new user can sign in", async ({homePage}) => {
    await homePage.open();

    const registerPage = await homePage.header.goToRegister()

    const user = createUser();
    await registerPage.register(user)

    await expect(registerPage.successMessage).toBeVisible();
});