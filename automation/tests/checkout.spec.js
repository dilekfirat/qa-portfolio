import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

//Login before each checkout test
test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
});

//Complete checkout process and verify order completion
test('Complete checkout process', async ({ page }) => {

    // Add first product to cart
    const firstProduct = page.locator('.inventory_item').first();
    await firstProduct.getByRole('button', { name: /Add to cart/ }).click();

    //Go to cart page
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);

    //Proceed to checkout
    await page.getByRole('button', { name: /Checkout/ }).click();
    await expect(page).toHaveURL(/checkout-step-one/);

    //Fill in checkout information and continue
    await page.getByPlaceholder('First Name').fill('Dilek');
    await page.getByPlaceholder('Last Name').fill('Firat');
    await page.getByPlaceholder('Postal Code').fill('1030');
    await page.getByRole('button', { name: /Continue/ }).click();

    //Verify on overview page
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.getByRole('button', { name: /finish/i })).toBeVisible();

    //Finish checkout
    await page.getByRole('button', { name: /Finish/ }).click();
    await expect(page).toHaveURL(/checkout-complete/);

    //Verify order completion message
    await expect(page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();

});

//Verify error message on missing checkout information
test('Checkout missing information shows error', async ({ page }) => {

    // Add first product to cart
    const firstProduct = page.locator('.inventory_item').first();
    await firstProduct.getByRole('button', { name: /Add to cart/ }).click();

    //Go to cart page
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);

    //Proceed to checkout
    await page.getByRole('button', { name: /Checkout/ }).click();
    await expect(page).toHaveURL(/checkout-step-one/);

    //Leave fields empty and continue
    await page.getByRole('button', { name: /Continue/ }).click();

    //Verify error message is shown
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Error: First Name is required');

});

//Cancel checkout and verify return to cart page
test('Cancel checkout returns to cart page', async ({ page }) => {

    // Add first product to cart
    const firstProduct = page.locator('.inventory_item').first();
    await firstProduct.getByRole('button', { name: /Add to cart/ }).click();

    //Go to cart page
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);

    //Proceed to checkout
    await page.getByRole('button', { name: /Checkout/ }).click();
    await expect(page).toHaveURL(/checkout-step-one/);

    //Click cancel button
    await page.getByRole('button', { name: /Cancel/ }).click();

    //Verify return to cart page
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await expect(page.getByRole('button', { name: /Remove/ })).toHaveCount(1);
    await expect(page.getByRole('button', { name: /Checkout/ })).toHaveCount(1);
    
});