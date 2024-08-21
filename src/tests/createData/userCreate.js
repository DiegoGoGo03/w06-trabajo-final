const User = require('../../models/User')

const userCreate = async () => {
    const user = {
        firstName: "Juan",
        lastName: "Yidi",
        email: "joseyidi1234@gmail.com",
        password: "juanyidi12345678",
        phone: "+574567892312"
    }

    await User.create(user)
}

module.exports = userCreate