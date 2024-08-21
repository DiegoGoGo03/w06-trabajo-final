const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/use7rs'

let TOKEN

beforeAll(async () => {
    const user = {
        email: "oseyidi1234@gmail.com",
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
    const res = await require(app)
        .post(BASE_URL)
        .send(user)

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined(201)



    expect(res.body.firstName).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)


})