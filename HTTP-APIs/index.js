import express from 'express'
import VisitorService from './services/visitor-service.js'
import BookService from './services/book-service.js'
import Visitor from './models/visitor.js'
import Book from './models/book.js'

const port = 3000; 
const hostname = '127.0.0.1';
const app = express()

app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.get('/', (req, res) => {
	res.render('index')
})

//Add book

app.get('/book/add', (req, res) => {
	res.render('add-book')
})

app.post('/book/add', async (req, res) => {
	console.log(req.body)
	const book = new Book(
		req.body.name,
		req.body.author,
		req.body.publisher,
		req.body.page,
		req.body.img_url
		)
		await BookService.add(book)
		res.redirect('/book/add')
})
	
//	View Books

app.get('/book/all', async (req, res) => {
	const allBooks = await BookService.findAll()
	res.render('books', {books: allBooks})
})

app.get('/book/:id', async (req, res) => {
	const id = req.params.id
	const book = await BookService.find(id)
	res.render('book', {book: book})
})

//	View Visitors
app.get('/visitor/all', async (req, res) => {
	const allVisitors = await VisitorService.findAll()
	res.render('visitors', {visitors: allVisitors})
})

app.get('/visitor/:id', async (req, res) => {
	const id = req.params.id
	const visitor = await VisitorService.find(id)
	
	res.render('visitor', {visitor: visitor})
})


//	Delete visitor

app.delete('/visitor/:id', async (req, res) => {
	await VisitorService.del(req.params.id)
	console.log('Visitor deleted successfully! ID: ' + req.params.id)
})

//	Visitor Login Page
app.get('/login', (req, res) => {
	res.render('login')
})

//	Visitor Check Login
app.post('/check/login', async (req, res) => {
	const result = await VisitorService.checkLogin(req.body.username, req.body.password)
	if(!result.success)
		return res.redirect('/login',result)
	res.redirect('/index')
})

//	Visitor Signup Page
app.get('/signup', (req, res) => {
	res.render('signup')
})

//	Visitor Check Signup
app.post('/check/signup', async (req, res) => {
	const result = await VisitorService.checkSignup(req.body.username)
	if(!result.success)
		return res.render('signup', {err:result})
	const visitor = new Visitor(
		req.body.username,
		req.body.password,
    req.body.fullName,
    req.body.birthYear
	)

	await VisitorService.add(visitor)
	res.redirect('/login')

})

app.listen(port,hostname , ()=>{
	console.log(`Server running at http://${hostname}:${port}`)
})
