import { test, expect } from '@playwright/test';

test('Word cloud', async ({ page }) => {

  await page.goto('https://www.k12insight.com/static/k12insight_login.html');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('nsawant1+indialive@zarca.com');
  await page.getByPlaceholder('Username').press('Tab');
  await page.getByPlaceholder('Password').fill('Welcome@123');
  await page.getByRole('button', { name: 'LOG IN' }).click();
  await page.getByAltText('logo')    
});