import test, { PlaywrightTestConfig, chromium, expect } from "@playwright/test";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

test("Login to K12",async({page}) =>{

    await page.goto('https://k12qauc.k12insight.com/static/k12insight_login.html');
    await page.getByPlaceholder('Username').fill('nsawant1+profile@zarca.com');
    await page.getByPlaceholder('Password').fill('Ninad@123');
    await page.getByRole('button', { name: 'LOG IN' }).click();
    await expect(page.getByRole('cell', { name: 'Customer', exact: true })).toBeVisible({timeout:30000});
    const loadingElement = page.locator('img[role="img"][alt="loading"]');
    //await loadingElement.waitFor({ state: 'visible' });
    await loadingElement.waitFor({ state: 'hidden' });
    await expect(page.getByText('Show All')).toBeVisible();
})