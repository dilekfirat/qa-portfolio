// Creates a LoginPage class to encapsulate login page interactions
exports.LoginPage = class LoginPage {

    // Define selectors and constructor
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');

    }
    // Navigate to the login page
    async navigate() {
        await this.page.goto('/');
    }
    // Perform login action
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}