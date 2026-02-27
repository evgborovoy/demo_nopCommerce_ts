import type {Page, Locator} from "@playwright/test";
import {LoginPage} from "../login.page.js";

export class HeaderComponent {
    readonly registerLink: Locator;
    readonly loginLink: Locator;

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;

        this.registerLink = page.getByRole("link", {name: "Register"});
        this.loginLink = page.getByRole("link", {name: "Log in"});
    }

    async goToLogin(): Promise<LoginPage> {
        await this.loginLink.click();
        return new LoginPage(this.page)
    }
}