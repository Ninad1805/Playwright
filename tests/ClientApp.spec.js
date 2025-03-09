import { test, expect } from '@playwright/test';


test('Get all products', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("//input[@id='userEmail']").fill('anshika@gmail.com')
    await page.locator("//input[@id='userPassword']").fill('Iamking@000')
    await page.locator("//input[@id='login']").click()
    await page.locator("//h3[text()='Automation']").isVisible()
    await page.waitForLoadState('networkidle') //Flaky sometimes
    await page.locator(".card-body b").first().waitFor()
    const totalProducts = await page.locator("//b").allTextContents();
    console.log(totalProducts)
})