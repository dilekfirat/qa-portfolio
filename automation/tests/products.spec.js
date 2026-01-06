import { test, expect } from '@playwright/test';

//Login before each product test
test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('text=Products')).toHaveCount(1)

});

test('View product details page', async ({ page }) => {

  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
  await expect(page.locator('.inventory_details_name.large_size')).toHaveText('Sauce Labs Backpack');
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

test('test sorting functionality', async ({ page }) => {

  //Sort by price low to high
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  var priceTexts = await page.locator('.inventory_item_price').allTextContents()
  var prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
  var sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);

  //Sort by price high to low
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  priceTexts = await page.locator('.inventory_item_price').allTextContents()
  prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
  sortedPrices = [...prices].sort((a, b) => b - a);

  //Sort by name A to Z
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  var nameTexts = await page.locator('.inventory_item_name').allTextContents();
  var sortedNames = [...nameTexts].sort((a, b) =>
    a.localeCompare(b)
  );
  expect(nameTexts).toEqual(sortedNames);


  //Sort by name Z to A
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  nameTexts = await page.locator('.inventory_item_name').allTextContents();
  sortedNames = [...nameTexts].sort((a, b) =>
    b.localeCompare(a)
  );
  expect(nameTexts).toEqual(sortedNames);


})