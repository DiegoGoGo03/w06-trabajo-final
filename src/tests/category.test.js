const request = require('supertest')
const app = require('../app')


const BASE_URL = '/api/v1/categories'
const BASE_URL_LOGIN = '/api/v1/users/login'

let TOKEN

let categoryId


beforeAll(async () => {
    const user = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678",
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)
    TOKEN = res.body.token
})

const category = {
    name: "Jeans"

}


test("POST -> BASE_URL, should return statusCode 201, res.body.name === category.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)

    console.log(res.body); // Depurar el problema
    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})


test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
    const res = await request(app)
        .get(BASE_URL)
    

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("DELETE -> BASE_URL/:id, should return statusCode 204", async () => {
    console.log(`Deleting category with ID: ${categoryId}`); // Añadir esto para depurar el problema
    const res = await request(app)
        .delete(`${BASE_URL}/${categoryId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
})