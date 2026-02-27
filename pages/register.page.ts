import type {Page, Locator} from "@playwright/test"
import {BasePage} from "./base.page.js";
import type {User} from "../utils/user.factory.js"

export class RegisterPage extends BasePage {
    protected readonly path: string = "/register?returnUrl=%2F"

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = page.getByLabel("First Name:");
        this.lastNameInput = page.getByLabel("Last Name:");
        this.emailInput = page.getByLabel("Email:");
        this.passwordInput = page.locator("#Password");
        this.confirmPasswordInput = page.locator("#ConfirmPassword");
        this.registerButton = page.getByRole("button", {name: "Register"});
        this.successMessage = page.getByText('Your registration completed');
    }

    async waitForLoaded(): Promise<void> {
        await this.registerButton.waitFor({state: 'visible'});
    }

    async register(user: User): Promise<void> {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.registerButton.click()
    }
}