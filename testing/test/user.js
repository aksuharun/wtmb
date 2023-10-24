import test from 'ava'
import request from 'supertest'
import app from '../app.js'

test('Create new user', async t => {
	t.plan(1)
	const userToCreate = {
		username : 'aksuharun',
		name : 'Harun Aksu',
		age : 19,
		groups : []
	}

	const res = await request(app)
		.post('/user')
		.send(userToCreate)
	
	t.is(res.status, 200)
})

