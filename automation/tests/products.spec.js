import {test, expect} from '@playwright/test'; 

test('View product details page', async ({page}) => {

  await page.goto('https://www.saucedemo.com/');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await Promise.all([
  page.waitForURL('**/inventory.html'),
  page.click('[data-test="login-button"]')
]);
  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
  await expect(page.locator('.inventory_details_name.large_size')).toHaveText('Sauce Labs Backpack');
})