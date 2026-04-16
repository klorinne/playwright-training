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

test('GET /products/{id}', async ({ request }) => {
    const apiURL = "https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(apiURL + "/products/search?q=thor%20hammer");

    expect(getProductResponse.status()).toBe(200);
    const productBody = await getProductResponse.json();
    const productId = productBody.data[0].id;

    // different api
    const response = await request.get(apiURL + "/products/" + productId);
    expect(response.status()).toBe(200);
    const apiBody = await response.json();

    expect(apiBody.in_stock).toBe(true);
    expect(apiBody.in_stock).toBe(true);
    expect(apiBody.is_location_offer).toBeDefined();
    expect(apiBody.is_rental).not.toBe(true);
    expect(apiBody.name).toBe("Thor Hammer");
    expect(apiBody.price).toBe(11.14);
});