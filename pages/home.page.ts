import type {Page, Locator} from "@playwright/test"
import {BasePage} from "./base.page.js"
import {HeaderComponent} from "./components/header.component.js";
import {SearchResultPage} from "./search_result.page.js";


export class HomePage extends BasePage {
    protected readonly path = "/"

    readonly header: HeaderComponent
    readonly searchInput: Locator;
    readonly searchButton: Locator;


    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page)
        this.searchInput = page.getByPlaceholder("Search store");
        this.searchButton = page.getByRole("button", {name: "Search"})
    }

    async open(): Promise<void> {
        await super.open();
        await this.searchInput.waitFor({state: 'visible'});
    }


    async search(text: string): Promise<SearchResultPage> {
        await this.searchInput.fill(text);
        await this.searchButton.click();

        await Promise.all([
            this.page.waitForURL("**/search**")
        ])

        const searchResult = new SearchResultPage(this.page)
        await searchResult.waitForLoaded()
        return searchResult
    }

}