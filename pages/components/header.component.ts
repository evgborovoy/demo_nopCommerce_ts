import type {Page, Locator} from "@playwright/test";
import {LoginPage} from "../login.page.js";
import {AccountPage} from "../account.page.js";
import {RegisterPage} from "../register.page.js";

export class HeaderComponent {
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly logoutLink: Locator;
    readonly myAccountLink: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;

        const header = page.getByRole("banner")

        this.registerLink = header.getByRole("link", {name: "Register"});
        this.loginLink = header.getByRole("link", {name: "Log in"});
        this.logoutLink = header.getByRole("link", {name: "Log out"});
        this.myAccountLink = header.getByRole("link", {name: "My account"});
    }

    async goToLogin(): Promise<LoginPage> {
        await Promise.all([
            this.page.waitForURL('**/login**'),
            this.loginLink.click(),
        ]);

        const loginPage = new LoginPage(this.page);
        await loginPage.waitForLoaded();
        return loginPage;
    }

    async goToMyAccount(): Promise<AccountPage> {
        await Promise.all([
            this.page.waitForURL('**/customer/info'),
            this.myAccountLink.click(),
        ]);

        const accountPage = new AccountPage(this.page);
        await accountPage.waitForLoaded();
        return accountPage;
    }

    async goToRegister(): Promise<RegisterPage> {
        await Promise.all([
            this.page.waitForURL('**/register**'),
            this.registerLink.click(),
        ])

        const registerPage = new RegisterPage(this.page);
        await registerPage.waitForLoaded();
        return registerPage;
    }
}