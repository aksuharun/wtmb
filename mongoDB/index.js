import express from 'express'
import './mongo-connection.js'

import {userRouter} from './routes/user.js'


const app = express()
app.set('view engine', 'pug')
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use('/user',userRouter)
// app.use('/group',groupRouter)

app.get('/', (req, res) => {
	res.render('index')
})

app.listen('3000', () => {
	console.log('Server listening on port 3000')
})