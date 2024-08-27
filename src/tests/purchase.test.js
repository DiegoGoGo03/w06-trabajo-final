require('../models')
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Purchase = require('../models/Purchase');

let TOKEN;
const BASE_URL_LOGIN = '/api/v1/users/login';
const BASE_URL = '/api/v1/purchase';

let category;
let product;

beforeAll(async () => {
    const user = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678",
    };
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user);
    TOKEN = res.body.token;

    category = await Category.create({ name: 'Smartphones' });

    product = await Product.create({
        title: 'iPhone 15 Pro',
        description: 'A new iPhone of 2024',
        price: 800.5,
        categoryId: category.id,
    });

    await Cart.create({
        productId: product.id,
        quantity: 2,
        userId: res.body.user.id
    });
});

afterAll(async () => {
    await Cart.destroy({ where: {} });
    await Purchase.destroy({ where: {} });
    await product.destroy();
    await category.destroy();
});

test("POST -> 'BASE_URL', should create a purchase and return status code 201", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);
});

test("GET -> 'BASE_URL', should return status code 200 and include purchase details", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body[0].productId).toBe(product.id);
});
