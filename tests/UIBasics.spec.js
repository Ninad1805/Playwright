import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
  await page.goto('https://google.com');
  console.log('Page title:', await page.title());
  expect(await page.title()).toBe('Google');
})

test('Rahul Shetty Login Failure', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('Page title:', await page.title());
  expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
  //Css or Xpaths selectors
  await page.locator("//input[@id='username']").fill('Ninad Sawant');
  await page.locator("//input[@id='password']").fill('password');
  await page.locator("//input[@type='submit']").click();
  console.log(await page.locator("[style*='block']").textContent());
  expect(await page.locator("[style*='block']").textContent()).toContain('Incorrect username/password.');
})

test('Rahul Shetty Login Success', async ({ page }) => {
  const cardTitles = page.locator(".card-body a");
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('Page title:', await page.title());
  expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
  //Css or Xpaths selectors
  await page.locator("//input[@id='username']").fill('rahulshettyacademy');
  await page.locator("//input[@id='password']").fill('learning');
  await page.locator("//input[@type='submit']").click();
  console.log('Page title:', await page.title());
  await page.locator("//a[@class='navbar-brand' and text()='ProtoCommerce']").isVisible();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(2).textContent());
  const allTitles = await cardTitles.allTextContents()
  console.log(allTitles);
});

test('RB and Dropdowns with validations', async ({ page }) => {

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  await page.locator("//input[@id='username']").fill('rahulshettyacademy')
  await page.locator("//input[@id='password']").fill('learning')
  const dropDown = await page.locator("//select[@class='form-control']")
  await dropDown.selectOption("consult")
  await page.locator("//input[@value='user']").click()
  await page.locator("#okayBtn").click()
  expect(await page.locator(".radiotextsty").last().isChecked())
  console.log(await page.locator(".radiotextsty").last().isChecked())
  await expect(page.locator(".radiotextsty").last()).toBeChecked()
  await page.locator("#terms").click()
  await expect(page.locator("#terms")).toBeChecked()
  await page.locator("#terms").uncheck()
  expect(await page.locator("#terms").isChecked()).toBeFalsy()
  await page.locator("//input[@type='submit']").click()
})

test('Handling child windows', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
  const documentLink = page.locator("[href*='documents-request']")
  const [newPage] = await Promise.all(
    [context.waitForEvent('page'),//Listen for any new page
    documentLink.click(),
    ])
  const text = await newPage.locator('.red').textContent()
  console.log(text)
  const arrayText = text.split("@")
  const domain = arrayText[1].split(" ")[0]
  console.log(domain)
  await page.locator("#username").type(domain)
  console.log(await page.locator("#username").textContent())
})

test('Codegen test', async ({ page }) => {
  await page.goto('https://www.k12insight.com/');
  await page.getByRole('button', { name: 'Close' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Login' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Username' }).click();
  await page1.getByRole('textbox', { name: 'Username' }).fill('nsawant1@zarca.com');
  await page1.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page1.getByRole('textbox', { name: 'Password' }).fill('Welcome@123');
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await page1.getByText('Invalid User Name or Password').click();
});