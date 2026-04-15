import {test, expect} from "@playwright/test"

test('GET /products', async ({ request }) => {
    const apiURL = "https://api.practicesoftwaretesting.com";
    const response = await request.get(apiURL + "/products");

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);    
});

test('POST /users/login', async ({ request }) => {
    const apiURL = "https://api.practicesoftwaretesting.com";
    const email = "customer@practicesoftwaretesting.com"
    const password = "welcome01"
    const response = await request.post(apiURL + "/users/login", {
        data: {
            email: email,
            password: password
        },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
});