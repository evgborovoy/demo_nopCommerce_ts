import type {Page, Locator} from "@playwright/test"
import {BasePage} from "./base.page.js"
import {HeaderComponent} from "./components/header.component.js";
import { expect } from '@playwright/test'

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
        this.addToCartButton = page.locator("button.add-to-cart-button");
        this.notificationBar = page.locator("#bar-notification");
        this.notificationText = this.notificationBar.locator(".content");
    }

    async waitForLoaded(): Promise<void> {
        await this.addToCartButton.waitFor({state: "visible"});
    }

    async addToCart(): Promise<void> {
        await this.page.waitForLoadState("load")
        await expect(this.addToCartButton).toBeVisible();
        await expect(this.addToCartButton).toBeEnabled();
        await this.addToCartButton.scrollIntoViewIfNeeded();

        const beforeQty = await this.header.cartQty.innerText();

        await this.addToCartButton.click();

        await Promise.race([
            expect(this.notificationText).toContainText(
                /has been added to your shopping cart/i,
                { timeout: 15000 }
            ),
            expect
                .poll(async () => await this.header.cartQty.innerText(), { timeout: 15000 })
                .not.toBe(beforeQty),
        ]);
    }
}