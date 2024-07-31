import test, { PlaywrightTestConfig, chromium } from "@playwright/test";


test("Login to K12",async() =>{

    //Initizlize browser
    const browser = await chromium.launch({
        headless:false
    });
    const context  = await browser.newContext();
    const context1  = await browser.newContext();
    const page = await context.newPage();
    const page1 = await context1.newPage();

    await page.goto("https://www.k12insight.com/Lets-talk.aspx")
    await page.fill("input[placeholder='Username']","nsawant1+indialive@zarca.com")
    await page.fill("input[placeholder='Password']","Welcome@123")
    await page.click("input[id='submit']")
    await page.getByAltText('logo')    
})