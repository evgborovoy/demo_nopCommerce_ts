import type {Page, Locator} from "@playwright/test";
import {BasePage} from "./base.page.js";
import {HeaderComponent} from "./components/header.component.js";

export class CartPage extends BasePage {
    protected readonly path = "/cart";

    readonly header: HeaderComponent;

    readonly cartRows: Locator;
    readonly updateCartButton: Locator;
    readonly orderSummary: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.header = new HeaderComponent(page);

        this.cartRows = page.locator("//div[contains(@class, 'table-wrapper')]//tbody//tr");
        this.updateCartButton = page.locator("#updatecart");
        this.orderSummary = page.locator(".order-summary-content");
        this.emptyCartMessage = page.getByText("Your Shopping Cart is empty!");
    }

    async waitForLoaded(): Promise<void> {
        await this.orderSummary.waitFor({state: "visible"});
    }

    rowByProductName(productName: string): Locator {
        return this.cartRows.filter({
            has: this.page.getByRole("link", { name: productName }),
        });
    }

    qtyInput(productName: string): Locator {
        return this.rowByProductName(productName).locator("input.qty-input");
    }

    async setQuantity(productName: string, quantity: number): Promise<void> {
        await this.qtyInput(productName).fill(String(quantity));
        await this.updateCartButton.click();
    }

    async isEmpty(): Promise<boolean> {
        return await this.emptyCartMessage.isVisible();
    }
}