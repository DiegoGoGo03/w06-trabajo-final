const request = require('supertest')
const app = require('../app')
const supertest = require('supertest')

const BASE_URL = '/api/v1/users'

let TOKEN
let TOKEN2

beforeAll(async () => {
    const user = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    TOKEN = res.body.token
})


const user = {
    firstName: "Iuvil",
    lastName: "Pena",
    email: "iuvil@gmail.com",
    password: "iuvil1234",
    phone: "+575312323"
}

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {

    const columns = ['firstName', 'lastName', 'email', 'password', 'phone']
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()



    expect(res.body.firstName).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)


})

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 2", async () => {
    const res = await supertest(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(2)
})

// test("POST -> 'BASE_URL/Login', should return status code 200, and res.body.user.email === user.email", async() {
//     const user = {
//         email: "iuvil@gmail.com",
//         password: "iuvil1234"
//     }

//     const res = await request(app)
//         .post(`${BASE_URL}/login`)
//         .send(user)

//     TOKEN2 = res.body.token
// })