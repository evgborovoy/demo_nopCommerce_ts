import type {Page, Locator} from "@playwright/test";
import {BasePage} from "./base.page.js";

export class LoginPage extends BasePage {
    protected readonly path: string = "/login?returnUrl=%2F";

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.getByLabel("Email");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.getByRole("button", {name: "Log in"});
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}