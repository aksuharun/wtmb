import test from 'ava'
import request from 'supertest'
import app from '../app.js'

const randUsername = () => 'createdfortesting' + Math.floor(Math.random() * (10 ** 9))

test('Create new user', async t => {
	t.plan(4)
	const userToCreate = {
		username : randUsername(),
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
		username : randUsername(),
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

test('Delete a User', async t => {
	t.plan(4)
	const userToCreate = {
		username: 'willSelfDestruct',
		name: 'Test Testerson',
		age:128,
		group:[]
	}

	const createdUser =(await request(app)
		.post('/user')
		.send(userToCreate)).body

	const deleteRes = await request(app)
		.delete(`/user/${createdUser._id}`)
	
	t.is(deleteRes.status, 200)
	t.is(deleteRes.ok, true)
	const fetch = await request(app)
		.get(`/user/${createdUser._id}`)
	
	t.is(fetch.status, 404)
	
	const fetchJson = await request(app)
		.get(`/user/${createdUser._id}/json`)
	
	t.is(fetchJson.status, 404)
})