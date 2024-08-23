const request = requiere('supertest')
const app = require('../app')

let TOKEN
const BASE_URL_LOGIN = 'api/v1/users/login'
const BASE_URL = 'api/v1/products'

let product

beforeAll(async () => {
    const hits = {
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678",
    }
    const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(hits)

    TOKEN = res.body.token
    // console.log(TOKEN);s

    const category = await Category.create( { name: 'ropa para dama' })

    product = {
        title: 'Jeans blue woman',
        description: 'Lorem 20',
        price: 15.40,
        categoryId: category.id
    }
})

test("POST -> BASE_URL, should return status code 201, and res.body.title === product.title", async () => {

})
