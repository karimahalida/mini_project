const db = require('../config/db.js')
const promise = db.promise()
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const {
            username,
            email,
            phone,
            store_name,
            password
        } = req.body

        const [result] = await promise.query(`SELECT * FROM db_master_user where username='${username}'`)
        console.log(result)

        // if (username === 'karima' || username === 'rahmat') {
        if (result.length > 0) {
            return res.json({
                status: 400,
                message: 'Account Already Exist'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        await promise.query(`INSERT INTO db_master_user (
            username,
            email,
            phone,
            store_name,
            password)
            VALUES (
                '${username}',
                '${email}',
                '${phone}',
                '${store_name}',
                '${hashPass}'
            )`
        )

        res.json({
            status: 200,
            message: 'Registered Successfully'
        })
    },
    login: async (req, res) => {
        const {
            username,
            password
        } = req.body

        const [result] = await promise.query(`SELECT * FROM db_master_user WHERE username = '${username}'`)

        const isValid = await bcrypt.compare(password, result[0].password)

        // if (username === 'karima' && password === '1234' || username === 'rahmat' && password === '4321') {
        if (isValid) {
            return res.json({
                status: 200,
                message: 'Login Successfully'
            })
        }

        res.json({
            status: 400,
            message: 'Wrong Username or Password'
        })
    }
}