import express from 'express'
import UserService from './services/user-service.js'
import User from './models/user.js'
import bodyParser from 'body-parser'

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/user/all', async (req, res) => {
	const users = await UserService.findAll()
	res.render('users',{users: users})
})

app.get('/user/:id', async (req, res) => {
	const id = req.params.id
	const user = await UserService.find(id)

	res.render('user',{user: user})
})

app.post('/user/add',  async (req, res) => {
	console.log(req.body)
	await UserService.add(req.body)
})

app.delete('/user/:id', async (req, res) => {
	await UserService.del(req.params.id)
	console.log('User deleted successfully! ID: ' + req.params.id)
})

app.listen(3000, ()=>{
	console.log("Server listening")
})

