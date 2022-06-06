const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

// beforeEach(async () => {
//     await User.deleteMany({})
//     let user = new User({
//         username: 'djkhaled',
//         name: 'djk',
//         password: 'asdfjkl'
//     })
//     await user.save()

//     user = new User({
//         username: '50cent',
//         name: '50c',
//         password: 'asdfghjkl'
//     })
// }, 100000)

test('if invalid username, then error is returned', async () => {
    const invalidUser = {
        username: 'ja',
        name: 'jack',
        password: 'jackma'
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
}, 10000)

test('if invalid password, then error is returned', async () => {
    const invalidUser = {
        username: 'jackma',
        name:'jk',
        password: 'ja'
    }

    await api
        .post('/api/users')
        .send(invalidUser)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})