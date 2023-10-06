import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import VisitorService from './services/visitor-service.js'
import BookService from './services/book-service.js'
import Visitor from './models/visitor.js'
import Book from './models/book.js'

const port = 3000; 
const hostname = '127.0.0.1';
const app = express()

const sess = {
	secret: 'secret-key',
	cookie: {
		maxAge: 60 * 60 * 24 //one day 
	},
	resave: false,
  saveUninitialized: true

}

function setCookieMaxAge(time){
	time = time.toLowerCase()
	const timeFrame = ['s','h', 'm', 'd','w']
	var err = 0;


	for(var i = 0; i < time.length; i++){
		if(isNaN(time[i])){
			if(i == 0)
				err++
			break
		}
	}

	let number = time.slice(0,i);
	let unit = time.slice(i);

	if(unit.length > 1 || unit.length < 1 || number.length < 1)
		err++

	if(!timeFrame.some(elem => elem == unit) )
		err++

	if(err > 0){
		console.log('Invalid time!')
    return
	}

	number = parseInt(number)

	switch (unit) {
		case 's':
			return number * 1000
		case 'm':
			return number * 60 * 1000
		case 'h':
			return number * 60 * 60 * 1000
		case 'd':
			return number * 60 * 60 * 24 * 1000
		case 'w':
			return number * 60 * 60 * 24 * 7 * 1000
	}

}

// Set & Use
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.use(cookieParser())
app.use(session(sess))


app.get('/', async (req, res) => {
	const books = await BookService.findAll()
	res.render('index',{
		session: req.session,
		books:books
	})
})

//Add book

app.get('/book/add', (req, res) => {
	res.render('add-book')
})

app.post('/book/add', async (req, res) => {
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
	
// Own Book

app.get("/book/own/:id", async (req, res) => {
	const id = req.params.id
	const book = await BookService.find(id)
	const visitor = await VisitorService.find(req.session.visitorId)
	res.send('hi')

	if(visitor.ownedBooks === book.id)
		visitor.barrow(book)
	
})

//	View Books

app.get('/book/all', async (req, res) => {
	const allBooks = await BookService.findAll()
	res.render('books', {books: allBooks})
})

app.get('/book/:id', async (req, res) => {
	const id = req.params.id
	const book = await BookService.find(id)
	res.render('book', {
		session: req.session,
		book: book
	})
})

//	View Visitors
app.get('/visitor/all', async (req, res) => {
	const visitors = await VisitorService.findAll()
	res.render('visitors', {visitors: visitors})
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
	if(req.session.loginErr)
		return res.render('login', {err:true})	
	res.render('login')

})


//	Visitor Check Login
app.post('/check/login', async (req, res) => {
	const result = await VisitorService.checkLogin(
		req.body.username,
		 req.body.password
	)
	
	if(!result.success){
		setCookieMaxAge('15s')
		req.session.loginErr = true
		res.redirect('/login')
	}else{
		req.session.cookie.maxAge = setCookieMaxAge('1d')
		req.session.visitorId = result.visitorId
		res.redirect('/')
	}
})

// Visitor Logout
	app.get('/logout', (req, res) => {
		req.session.destroy()
		res.redirect('/')
	})

//	Visitor Signup Page
app.get('/signup', (req, res) => {
	res.render('signup')
})

//	Visitor Check Signup
app.post('/check/signup', async (req, res) => {
	const result = await VisitorService.checkSignup(req.body.username)
	if(!result.success)
	return res.render('signup', {err: result})
	const visitor = new Visitor(
		req.body.username,
		req.body.password,
    req.body.fullName,
    req.body.birthYear
	)

	await VisitorService.add(visitor)
	res.redirect('/login')

})

app.get('/profile', async (req, res) => {
	const visitorId = req.session.visitorId
	if(visitorId){
		const visitor = await VisitorService.find(visitorId)
		res.render('visitor', {visitor: visitor})
	}


})

app.listen(port,hostname , ()=>{
	console.log(`Server running at http://${hostname}:${port}`)
})
