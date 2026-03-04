import {test, expect} from './fixtures.js';

test('cart: add product from search', async ({homePage}) => {
    await homePage.open();

    const results = await homePage.search('phone');
    const productPage = await results.openFirstProduct();

    const productName = await productPage.productTitle.innerText();
    await productPage.addToCart();

    const cartPage = await productPage.header.goToCart();
    await cartPage.waitForLoaded();

    await expect(cartPage.rowByProductName(productName)).toBeVisible();
});

test("cart: update quantity", {tag: "@regression"}, async ({homePage}) => {
    await homePage.open();

    const results = await homePage.search("phone");
    const productPage = await results.openFirstProduct();
    const productName = (await productPage.productTitle.innerText()).trim();
    await productPage.addToCart();

    const cartPage = await productPage.header.goToCart();
    await cartPage.waitForLoaded();
    await cartPage.setQuantity(productName, 2);

    await expect(cartPage.qtyInput(productName)).toHaveValue('2');
});

test("cart: remove item", {tag: "@regression"}, async ({homePage}) => {
    await homePage.open();

    const results = await homePage.search('phone');
    const productPage = await results.openFirstProduct();
    const productName = (await productPage.productTitle.innerText()).trim();
    await productPage.addToCart();

    const cartPage = await productPage.header.goToCart();
    await cartPage.waitForLoaded();
    await cartPage.removeItem(productName);

    await expect(cartPage.emptyCartMessage).toBeVisible();
})