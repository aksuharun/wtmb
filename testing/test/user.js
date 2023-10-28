import test from 'ava'
import request from 'supertest'
import app from '../app.js'

const randUsername = () => 'createdfortesting' + Math.floor(Math.random() * (10 ** 9))
const randUser = () => {
	const userToCreate = {
		username : randUsername(),
		name : 'Test Testerson',
		age : 128,
		groups : []
	}
	return userToCreate
}
test('Create new user', async t => {
	t.plan(4)
	const userToCreate = randUser()

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
	const userToCreate = randUser()
	
	const createdUser = (await request(app)
		.post('/user')
		.send(userToCreate)).body
		
	const res = await request(app)
		.get(`/user/${createdUser._id}`)
	
	t.is(res.status, 200)
	const jsonRes = await request(app)
		.get(`/user/${createdUser._id}/json`)
	
	t.is(jsonRes.status, 200)
	t.deepEqual(jsonRes.body, createdUser)
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

	const fetchRes = await request(app)
		.get(`/user/${createdUser._id}`)
	
	t.is(fetchRes.status, 404)
	
	const fetchJsonRes = await request(app)
		.get(`/user/${createdUser._id}/json`)
	
	t.is(fetchJsonRes.status, 404)
})

test('Get list of users', async t => {
	t.plan(4)
	const userToCreate = randUser()

	const res  = await request(app)
		.get('/user/all')

	t.is(res.status, 200)

	const jsonRes  = await request(app)
		.get('/user/all/json')
	
	t.is(jsonRes.status, 200)

	t.true(Array.isArray(jsonRes.body), 'Body should be an array')
	t.true(jsonRes.body.length > 0)

})

test('User can join to a group', async t => {

	t.plan(4)
	const userToCreate = randUser()
	const groupToCreate = {
		name: 'Test',
		participants:[]
	}

	const createdUser = (await request(app)
		.post('/user')
		.send(userToCreate)).body

		
	const createdGroup = (await request(app)
		.post('/group')
		.send(groupToCreate)).body
		
	const joinGroupRes = await request(app)
		.post(`/user/${createdUser._id}/groups`)
		.send({'_id':createdGroup._id})
	
	t.is(joinGroupRes.status, 200)
	
	const updatedUser = joinGroupRes.body

	t.is(updatedUser.groups[0]._id, createdGroup._id)
	t.deepEqual(updatedUser.groups[0], createdGroup)
	t.notDeepEqual(updatedUser, createdUser)
})

