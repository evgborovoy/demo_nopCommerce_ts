import type {Page, Locator} from "@playwright/test";
import {LoginPage} from "../login.page.js";
import {AccountPage} from "../account.page.js";

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
        await this.loginLink.click();
        return new LoginPage(this.page)
    }

    async goToMyAccount(): Promise<AccountPage> {
        await this.myAccountLink.click();
        return new AccountPage(this.page)
    }
}