import type { Page, Locator} from "@playwright/test";

export class HeaderComponent {
    readonly registerLink: Locator;
    readonly loginLink: Locator;

    constructor(page: Page) {
        this.registerLink = page.getByRole("link", { name: "Register"});
        this.loginLink = page.getByRole("link", { name: "Log in"});
    }
}