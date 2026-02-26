import type {Page, Locator} from "@playwright/test"
import {BasePage} from "./base.page.js"
import {HeaderComponent} from "./components/header.component.js";


export class HomePage extends BasePage {
    protected readonly path = "/"

    readonly header: HeaderComponent
    readonly searchInput: Locator;


    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page)
        this.searchInput = page.getByPlaceholder("Search store");
    }


}