import {test, expect} from "@playwright/test"

test.describe("Checkout page with customer 01 auth", () => {
  test.use({ storageState: ".auth/customer01.json"});

  test.beforeEach(async ({page}) => {
    // ran before each test
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('buy now pay later', async ({ page }) => {
    // add to cart 1 Claw Hammer with Shock Reduction Grip
    await page.getByText("Claw Hammer with Shock Reduction Grip").click();
    await expect(page.getByTestId('product-name')).toContainText('Claw Hammer with Shock Reduction Grip');
    await expect(page.getByTestId('add-to-cart')).toBeVisible();
    await page.getByTestId('add-to-cart').click();
    await expect(page.getByRole('alert', { name: 'toasts.product-added-to-cart' })).toBeVisible();
    await expect(page.getByTestId('nav-cart')).toBeVisible();
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');

    // add to cart 3 combination pliers
    await page.getByTestId('nav-home').click();
    await page.getByTestId("product-01KPAVR0QWS0FH7H3DZTV6GSMF").click();
    await expect(page.getByTestId('product-name')).toContainText('Pliers');
    await page.getByTestId('increase-quantity').click();
    await page.getByTestId('increase-quantity').click(); // 3 combination pliers
    await page.getByTestId('add-to-cart').click();
    await expect(page.getByRole('alert', { name: 'toasts.product-added-to-cart' })).toBeVisible();
    await expect(page.getByTestId('cart-quantity')).toHaveText('4');

    // go to cart
    await page.getByTestId('nav-cart').click();
    await page.getByTestId('proceed-1').click();
    await page.getByTestId('proceed-2').click();
    //check if step 2 has correct bg color
    await expect(
        page.locator(".step-indicator").filter({hasText: "2"})
    ).toHaveCSS("background-color", "rgb(51, 153, 51)");

    // fill up billing address
    await page.getByTestId('state').fill('Sample');
    await page.getByTestId('postal_code').fill('11212');
    await page.getByTestId('proceed-3').click();
    // payment method
    await expect(page.getByTestId("finish")).toBeDisabled(); // check that payment button is disabled
    await page.getByTestId('payment-method').selectOption('Buy Now Pay Later');
    await page.getByTestId('monthly_installments').selectOption({index: 2});

    await expect(page.getByTestId("finish")).toBeEnabled(); // check that payment button is now enabled
    await page.getByTestId('finish').click();

    await expect(page.getByTestId('payment-success-message')).toBeVisible();
    await expect(page.getByTestId('payment-success-message')).toContainText('Payment was successful');
    await page.getByTestId('finish').click();

    // add visual test
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("checkout-bnpl-complete.png");
  });

});