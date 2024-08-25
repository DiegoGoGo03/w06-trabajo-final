require('../models');
const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const BASE_URL = '/api/v1/purchase';
const BASE_URL_LOGIN = '/api/v1/users/login';

let TOKEN;
let userId;
let productId;

beforeAll(async () => {
    // Iniciar sesión y obtener el token de usuario
    const user = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678"
    };
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user);
    TOKEN = res.body.token;

    // Crear un usuario de prueba
    const userResponse = await request(app)
        .post('/api/v1/users')
        .send({
            firstName: 'Juan',
            lastName: 'Yidi',
            email: 'juan@example.com',
            password: 'password123',
            phone: '+575312323'
        });
    userId = userResponse.body.id;

    // Crear una categoría de prueba
    const categoryResponse = await request(app)
        .post('/api/v1/categories')
        .send({ name: 'Electronics' });

    // Crear un producto de prueba
    const productResponse = await request(app)
        .post('/api/v1/products')
        .send({
            name: 'Laptop',
            price: 999.99,
            categoryId: categoryResponse.body.id
        });
    productId = productResponse.body.id;

    // Agregar producto al carrito del usuario
    await request(app)
        .post('/api/v1/carts')
        .send({ userId, productId, quantity: 1 });
});

afterAll(async () => {
    // Limpiar después de las pruebas (puedes necesitar ajustar esto según tu configuración)
    await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`);
    await request(app)
        .delete(`/api/v1/products/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`);
    await request(app)
        .delete(`/api/v1/categories/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`);
});


test('POST -> BASE_URL, should create a new purchase and clear the cart', async () => {
    // Asegúrate de que el carrito tenga elementos antes de ejecutar esta prueba
    const cartResponse = await request(app)
        .post('/api/v1/carts')
        .send({ productId: 1, quantity: 1 }) // Ajusta según los datos de tu prueba
        .set('Authorization', `Bearer ${TOKEN}`);

    // Ahora crea una compra
    const res = await request(app)
        .post(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`);

    console.log('Create Purchase Response:', res.body); // Añadir esto para depurar

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1); // Cambiado a 1 ya que deberías recibir una compra

    expect(res.body[0]).toHaveProperty('quantity', 1);

    // Verificar que el carrito está vacío
    const emptyCartResponse = await request(app)
        .get('/api/v1/carts')
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(emptyCartResponse.status).toBe(200);
    expect(emptyCartResponse.body).toHaveLength(0);
});




test('GET -> BASE_URL, should return all purchases for a user', async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('quantity', 1);
});
