import test from 'ava'
import request from 'supertest'
import app from '../app.js'

const groupToCreate = {
	name: 'Group Test',
	participants: []
}

test('Create a group', async t => {
	t.plan(2)

	const res = await request(app)
		.post('/group')
		.send(groupToCreate)

	t.is(res.status, 200)
	t.is(res.body.name, groupToCreate.name)
})

test('Fetch group', async t => {
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

test('Update group', async t => {
	t.plan(3)
	const createdGroup = (await request(app)
		.post('/group')
		.send(groupToCreate)).body
	
	const newName = {name: "New Group Name"}
	const updatedGroup = await request(app)
		.patch(`/group/${createdGroup._id}`)
		.send(newName)

	t.is(updatedGroup.status, 200)
	t.is(updatedGroup.body.name, newName.name)
	t.not(updatedGroup.body.name, groupToCreate.name)
})

test('Delete group', async t => {
	t.plan(2)
	const createdGroup = (await request(app)
		.post('/group')
		.send(groupToCreate)).body
		
		const deleteRes = await request(app)
			.delete(`/group/${createdGroup._id}`)
		
		t.is(deleteRes.status, 200)
		
		const fetchRes = await request(app)
			.get(`/group/${createdGroup._id}/json`)
	
		t.is(fetchRes.status, 404)
})

test(`Get the list of groups`, async t => {
	t.plan(4)
	const createdGroup = (await request(app)
		.post('/group')
		.send(groupToCreate)).body
	
	const fetchRes = await request(app)
		.get('/group/all')
	
	t.is(fetchRes.status, 200)

	const fetchJsonRes = await request(app)
		.get('/group/all/json')
	
	t.is(fetchJsonRes.status, 200)
	t.true(Array.isArray(fetchJsonRes.body))
	t.true(fetchJsonRes.body.length > 0)
})