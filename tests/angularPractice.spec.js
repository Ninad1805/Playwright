import { test, expect } from '@playwright/test';


test('Angular Practice Page title', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    const title = page.title();
    console.log('Page title:', await title);
    await expect(page).toHaveTitle('ProtoCommerce');
});

test('Fill form', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator("(//input[@name='name'])[1]").fill('Ninad Sawant')
    await page.locator("//input[@name='email']").fill('ninadsawant@gmail.com')
    await page.locator("//input[@type='password']").fill('password')
    await page.getByLabel('Check me out if you Love IceCreams!').click()
    await page.getByLabel('Employed').check()
    await page.getByLabel('Gender').selectOption("Female")
    await page.locator("input[name='bday']").fill('1995-01-01')
    await page.locator("//input[@type='submit']").click()
    await page.getByText('× Success! The Form has been').isVisible()
    await page.getByRole('link', { name: 'close' }).click()
    await page.getByRole('link', { name: 'Shop' }).click()
    await page.locator("//h4[text()='iphone X']").isVisible()
    await page.locator("app-card").filter({ hasText: 'Blackberry' }).first().locator("button").click()
    await page.getByText('Checkout ( 1 ) (current)').click()
    await page.locator("//a[@class='navbar-brand' and text()='ProtoCommerce Home']").isVisible()
});

test('Handle Calenders', async ({ page }) => {

    const monthNumber = "6"
    const year = "2022"
    const day = "15"
    const expectedList = [monthNumber, Date, year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator('.react-date-picker__calendar-button').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.locator('.react-calendar__navigation__label').click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click()
    await page.locator("//abbr[text()='" + day + "']").click()

    const inputs = await page.locator(".react-date-picker__inputGroup")
    for (let index = 0; index < inputs.count(); index++) {
        const value = inputs[index].getAttribute("value")
        expect(value).toBe(expectedList[index])
    }
});

test('Handle Iframes', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    const framesPage = page.frameLocator("#course-iframe")
    await framesPage.locator("//a[@class='new-navbar-highlighter' and text()='All Access plan']").click()
    await framesPage.locator("//h1[text()='All Access Subscription']").isVisible()
});