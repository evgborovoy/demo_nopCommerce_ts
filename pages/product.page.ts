import type {Page, Locator} from "@playwright/test"
import {BasePage} from "./base.page.js"
import {HeaderComponent} from "./components/header.component.js";

export class ProductPage extends BasePage {
    protected readonly path = "/"
    readonly header: HeaderComponent;

    readonly productTitle: Locator;
    readonly addToCartButton: Locator;
    readonly notificationBar: Locator;
    readonly notificationText: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page)

        this.productTitle = page.locator("div.product-name")
        this.addToCartButton = page.getByRole("button", {name: "Add to cart"});
        this.notificationBar = page.locator('#bar-notification');
        this.notificationText = this.notificationBar.locator('.content');
    }

    async waitForLoaded(): Promise<void> {
        await this.addToCartButton.waitFor({state: "visible"});
    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click()
        await this.notificationBar.waitFor({state: 'visible'});
    }
}