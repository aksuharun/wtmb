import express from 'express'
import './mongo-connection.js'

import {userRouter} from './routes/user.js'
import {groupRouter} from './routes/group.js'

const app = express()

app.set('view engine', 'pug')
app.use(express.json())

app.use('/user',userRouter)
app.use('/group',groupRouter)

app.get('/', (req, res) => {
	res.render('index')
})

export default app