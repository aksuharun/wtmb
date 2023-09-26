import express from 'express'
import VisitorService from './services/visitor-service.js'
import Visitor from './models/visitor.js'
import bodyParser from 'body-parser'

const port = 3000; 
const hostname = '127.0.0.1';
const app = express()

const pages = ['Books', 'Contact', 'Login'] 

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.render('index', {pages:pages})
})

//	View Visitors
app.get('/visitor/all', async (req, res) => {
	const visitors = await VisitorService.findAll()
	res.render('visitors', {visitors: visitors})
})

app.get('/visitor/:id', async (req, res) => {
	const id = req.params.id
	const visitor = await VisitorService.find(id)

	res.render('visitor',{visitor: visitor})
})


//	Add visitor

app.post('/visitor/add',  async (req, res) => {
	console.log(req.body)
	await VisitorService.add(req.body)
})

//  Delete visitor

app.delete('/visitor/:id', async (req, res) => {
	await VisitorService.del(req.params.id)
	console.log('Visitor deleted successfully! ID: ' + req.params.id)
})



app.listen(port,hostname , ()=>{
	console.log(`Server running at http://${hostname}:${port}`)
})
 