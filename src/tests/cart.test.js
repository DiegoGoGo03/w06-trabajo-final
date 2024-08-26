const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

let TOKEN;

const BASE_URL_LOGIN = '/api/v1/users/login';
const BASE_URL = '/api/v1/cart';

let category;
let product;
let cartItemId;

beforeAll(async () => {
    const user = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678",
    };
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user);
    TOKEN = res.body.token;

    category = await Category.create({ name: 'Electronics' });

    product = await Product.create({
        title: 'Smartphone',
        description: 'A smartphone with many features',
        price: 699.99,
        categoryId: category.id,
    });
});

afterAll(async () => {
    await category.destroy();
    await product.destroy();
});

test("POST -> 'BASE_URL', should return status code 201 and res.body.productId === product.id", async () => {
    const cartItem = {
        productId: product.id,
        quantity: 2,
    };

    const res = await request(app)
        .post(BASE_URL)
        .send(cartItem)
        .set('Authorization', `Bearer ${TOKEN}`);

    cartItemId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.productId).toBe(product.id);
});

test("GET -> 'BASE_URL', should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0].productId).toBe(product.id);
});

test("GET -> 'BASE_URL/:id', should return status code 200 and res.body.productId === product.id", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${cartItemId}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.productId).toBe(product.id);
});

test("PUT -> 'BASE_URL/:id', should return status code 200 and res.body.quantity === updatedQuantity", async () => {
    const updatedCartItem = {
        quantity: 5
    };

    const res = await request(app)
        .put(`${BASE_URL}/${cartItemId}`)
        .send(updatedCartItem)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.quantity).toBe(updatedCartItem.quantity);
});

test("DELETE -> 'BASE_URL/:id', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${cartItemId}`)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(204);
});
