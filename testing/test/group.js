import test from 'ava'
import request from 'supertest'
import app from '../app.js'

test('Create a group', async t => {
	t.plan(2)
	const groupToCreate = {
		name: 'Group Test',
		participants: []
	}

	const res = await request(app)
		.post('/group')
		.send(groupToCreate)

	t.is(res.status, 200)
	t.is(res.body.name, groupToCreate.name)
})

test('Fetch a group', async t => {
	const groupToCreate = {
		name: 'Group Test',
		participants: []
	}

	const createdGroup = (await request(app)
		.post('/group')
		.send(groupToCreate)).body
	
	const fetchRes = await request(app)
		.get(`/group/${createdGroup._id}`)	

	t.is(fetchRes.status, 200)

	const fetchJsonRes = await request(app)
		.get(`/group/${createdGroup._id}/json`)

	t.is(fetchJsonRes.status, 200)
	t.deepEqual(fetchJsonRes.body, createdGroup)
})

