import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

// Testing successful login
test('successful login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('text=Products')).toHaveCount(1)


});

//Testing login with invalid credentials
test('login fails with invalid username', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.login('user', 'secret_sauce');
    await expect(page).toHaveURL('/');
    await expect(
        page.getByText(
            'Username and password do not match any user in this service'
        )
    ).toBeVisible();
});

// Testing logout functionality 
test('user can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('/');
    await page.close();

})