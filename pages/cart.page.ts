import type {Page, Locator} from "@playwright/test";
import {BasePage} from "./base.page.js";
import {HeaderComponent} from "./components/header.component.js";

export class CartPage extends BasePage {
    protected readonly path = "/cart";

    readonly header: HeaderComponent;

    readonly cartRows: Locator;
    readonly updateCartButton: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);

        this.cartRows = page.locator("tr.cart-item-row");
        this.updateCartButton = page.locator("#updatecart");
    }

    async waitForLoaded(): Promise<void> {
        await this.cartRows.first().waitFor({state: "visible"});
    }

    rowByProductName(productName: string): Locator {
        return this.cartRows.filter({
            has: this.page.getByRole("link", {name: productName}),
        });
    }

    qtyInput(productName: string): Locator {
        return this.rowByProductName(productName).locator("input.qty-input");
    }

    async setQuantity(productName: string, quantity: number): Promise<void> {
        await this.qtyInput(productName).fill(String(quantity));
        await this.updateCartButton.click();
    }
}