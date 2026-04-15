import {test, expect} from "@playwright/test"

test('homepage test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  //ensure the sign-in link is present
  await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

  //check the title of the page
  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

  //check the count of items displayed
  const productGrid = page.locator(".col-md-9");
  await expect(productGrid.getByRole("link")).toHaveCount(9); // locator assertion
  expect(await productGrid.getByRole("link").count()).toBe(9); // non-locator assertion

  //search for thor hammer and check the result
  await page.getByTestId("search-query").fill("Thor Hammer");
  await page.getByTestId("search-submit").click();
  await expect(page.getByAltText("Thor Hammer")).toBeVisible();
});