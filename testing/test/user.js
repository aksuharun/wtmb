import test from 'ava'
import request from 'supertest'
import app from '../app.js'

const rand = () => Math.floor(Math.random() * 1000)

test('Create new user', async t => {
	t.plan(4)
	const userToCreate = {
		username : `createdfortesting${rand()}`,
		name : 'Test Testerson',
		age : 128,
		groups : []
	}

	const res = await request(app)
		.post('/user')
		.send(userToCreate)
	
	t.is(res.status, 200)
	t.is(res.body.username, userToCreate.username)
	t.is(res.body.name, userToCreate.name)
	t.is(res.body.age, userToCreate.age)
})

test('Fetch a user', async t => {
	t.plan(3)
	const userToCreate = {
		username : `createdfortesting${rand()}`,
		name : 'Test Testerson',
		age : 128,
		groups : []
	}
	
	const createdUser = (await request(app)
		.post('/user')
		.send(userToCreate)).body
		
	const fetchRes = await request(app)
		.get(`/user/${createdUser._id}`)
	
	t.is(fetchRes.status, 200)
	const fetchResJson = await request(app)
		.get(`/user/${createdUser._id}/json`)
	
	t.is(fetchResJson.status, 200)
	t.deepEqual(fetchResJson.body, createdUser)
})