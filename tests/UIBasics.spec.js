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

test.only('RB and Dropdowns with validations', async ({ page }) => {

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