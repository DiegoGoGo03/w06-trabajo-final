const request = require('supertest')
const app = require('../app')
const supertest = require('supertest')

const BASE_URL = '/api/v1/categories'
const BASE_URL_LOGIN = '/api/v1/users/login'


let categoryId


beforeAll(async () => {
    const BASE_URL = '/api/v1/users'
    const user = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678",
    }
    const res = await request(app)
        .post  (`${BASE_URL}/login`)
        .send(user)
    TOKEN = res.body.token
})

const category = {
    name: "Jeans"

}


test("POST -> BASE_URL, should return statusCode 20, res.body.name === category.name", async () => {
    const Rres = await request(app)
        .POST(BASE_URL)
        .send(category)
        .set('Authorization', `Bearer ${TOKEN}`)
    categoryId = res.body.categoryId
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

