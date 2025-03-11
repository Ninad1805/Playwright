import { test, expect } from '@playwright/test';
import { count } from 'console';


test('Printing product id', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3'
    const products = page.locator(".card-body")
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("//input[@id='userEmail']").fill(email)
    await page.locator("//input[@id='userPassword']").fill('Iamking@000')
    await page.locator("//input[@id='login']").click()
    await page.locator("//h3[text()='Automation']").isVisible()
    await page.waitForLoadState('networkidle') //Flaky sometimes
    await page.locator(".card-body b").first().waitFor()
    const tites = await page.locator(".card-body b").allTextContents();
    console.log(tites)
    const count = await products.count()
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    //await page.pause()
    await page.locator("[routerlink*='cart']").click();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").type("ind");

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
})