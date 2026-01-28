// Creates a CartPage class to encapsulate cart page interactions
exports.CartPage = class CartPage {

    // Define constructors and selectors
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
    }

    // Navigate to the cart page
    async navigate() {
        await this.page.goto('/cart.html');
    }

    // Remove the first item from the cart
    async removeFirstItem() {
        const firstItem = this.cartItems.first();
        await firstItem.locator('button:has-text("Remove")').click();
    }

    // Proceed to checkout
    async proceedToCheckout() {
    await this.page.getByRole('button', { name: /checkout/i }).click();
  }


}