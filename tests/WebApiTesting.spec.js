import { test, expect, request } from '@playwright/test';
const loginPayload = { userEmail: "sedene9987@doishy.com", userPassword: "Welcome@123" };
const orderIdPayload = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
let orderId;
let token;

test.beforeAll(async ({ }) => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json()
    token = loginResponseJson.token;
    console.log(token);
});


test('Order without login', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    const email = "sedene9987@doishy.com";
    const productName = 'ZARA COAT 3'
    const products = page.locator(".card-body")
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


    const rows = await page.locator("tbody tr");
    await page.locator("//button[@routerlink='/dashboard/myorders']").click()

    await page.locator("//tbody").waitFor();
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    expect(orderId.includes(await page.locator("div.col-text").textContent())).toBeTruthy();
});


test('Get order id using API', async ({ page }) => {
    const apiContext = await request.newContext();
    const createOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderIdPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })

    const orderResponseJson = await createOrderResponse.json()
    orderId = orderResponseJson.orders[0];
    console.log(orderResponseJson)
    console.log('Order id is: ' + orderId)

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    
    await page.goto('https://rahulshettyacademy.com/client');
    const rows = await page.locator("tbody tr");
    await page.locator("//button[@routerlink='/dashboard/myorders']").click()
    await page.locator("//tbody").waitFor();
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    expect(orderId.includes(await page.locator("div.col-text").textContent())).toBeTruthy();
});