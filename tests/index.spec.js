// @ts-check
const { test, expect } = require('@playwright/test');

test('Hello world visible', async ({ page }) => {
  await page.goto('http://localhost:3000/src/');

  // Expect a title "to contain" a substring.
  await expect(page.getByText('Hello world')).toBeVisible()
});