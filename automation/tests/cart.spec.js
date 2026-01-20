import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.js';

//Login before each cart test
test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

//Add single item to cart and verify
test('Add single item to cart', async ({ page }) => {

    // Add first product to cart
    const firstProduct = page.locator('.inventory_item').first();
    await firstProduct.getByRole('button', { name: /Add to cart/ }).click();

    //Verify cart badge shows 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    //Verify cart page shows the added item
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await page.locator('.cart_item').isVisible();

});

//Add multiple items to cart and verify
test('Add multiple items to cart', async ({ page }) => {

    const addToCartButtons = page.getByRole('button', {name: /Add to cart/});

    // Add first 3 products to cart
    for (let i = 0; i < 3; i++) {
        await addToCartButtons.nth(i).click();
    }

    // Verify cart badge count
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

});

//Remove item from cart and verify on products page
test('Remove item from cart on products page', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

});

//Remove item from cart and verify on cart page
test('Remove item from cart and verify on cart page', async ({ page }) => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

});

//Logout and login again to verify items in cart are still there
test('Verify cart items persist after logout and login', async ({ page }) => {

    //Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    //Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    //Login again
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');

    //Verify cart item is still there
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});

//Click product image to navigate to product details page
test('Navigate to product details page from cart', async ({ page }) => {

    // Get first product from inventory
    const firstProduct = page.locator('.inventory_item').first();

    // Add first product to cart
    await firstProduct.getByRole('button', { name: /Add to cart/ }).click();

    // Go to cart
    await page.locator('.shopping_cart_link').click();

    // Click first product name in cart
    await page.locator('.inventory_item_name').first().click();

    // Verify navigation to product details page
    await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);

});

//Click continue shopping from cart to go back to products page
test('Continue shopping from cart to products page', async ({ page }) => {

    // Go to cart
    await page.locator('.shopping_cart_link').click();

    // Click continue shopping button
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // Verify navigation back to products page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

});
