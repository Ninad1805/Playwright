class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        const loginResponseJson = await loginResponse.json()
        const token = loginResponseJson.token;
        console.log('The token is: ' +  token);
        return token;
    }

    async createOrder(orderIdPayload) {
        let response = {};
        response.token = await this.getToken();
        console.log(response.token);
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderIdPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
            })

        const orderResponseJson = await orderResponse.json()
        console.log(orderResponseJson)
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        console.log(response)

        return response;
    }

}

module.exports = { APIUtils };