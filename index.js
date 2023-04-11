const express = require('express')
const dotenv = require('dotenv')
const { userRouter } = require('./router')
// const { route } = require('./router/userRouter')
dotenv.config()
const db = require('./config/db.js')

// const router = require('./router')

const app = express()
app.use(express.json())

db.connect((err) => {
    if (!err) {
        console.log('Database Connected')
    }
    // console.log(err)
})

// for (route of router.route) {
//     app.use('/api', route)
// }

app.use('/api', userRouter)

app.listen(process.env.PORT, () => console.log(`API running on PORT ${process.env.PORT}`))