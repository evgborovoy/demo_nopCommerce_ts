import type {Page, Locator} from "@playwright/test";
import {BasePage} from "./base.page.js"

export class AccountPage extends BasePage {
    protected readonly path = "/customer/info"

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        super(page);

        this.firstNameInput = page.getByLabel("First Name");
        this.lastNameInput = page.getByLabel("Last Name");
        this.saveButton = page.getByRole("button", {name: "Save"});
    }

    async waitForLoaded(): Promise<void> {
        await this.saveButton.waitFor({state: 'visible'});
    }
}