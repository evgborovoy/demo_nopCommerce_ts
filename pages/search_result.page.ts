import type {Page, Locator} from "@playwright/test"
import {BasePage} from "./base.page.js"
import {ProductPage} from "./product.page.js"

export class SearchResultPage extends BasePage {
    protected readonly path = "/search"

    readonly productLinks: Locator;

    constructor(page: Page) {
        super(page)

        this.productLinks = page.locator(".product-item")
    }

    async waitForLoaded(): Promise<void> {
        await this.productLinks.first().waitFor({state: "visible"})
    }

    async openFirstProduct(): Promise<ProductPage> {
        await this.productLinks.first().click()

        const productPage = new ProductPage(this.page)
        await productPage.waitForLoaded()
        return productPage;
    }

}