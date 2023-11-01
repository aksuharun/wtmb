import test from 'ava'
import request from 'supertest'
import app from '../app.js'

const randNum = () => Math.floor(Math.random() * (10 ** 9))
const randUser = () => {
	const userToCreate = {
		username :'createdForTesting' + randNum(),
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

test('Update a User', async t => {
	t.plan(7)

	const userToCreate = randUser()
	const createRes = await request(app)
		.post('/user')
		.send(userToCreate)

	t.is(createRes.status, 200)
	const createdUser = createRes.body
	
	const newUsername = 'newusername' + randNum()
	const withUpdatedUsername = (await request(app)
		.patch(`/user/${createdUser._id}`)
		.send({ username: newUsername })).body
	
	t.is(withUpdatedUsername.username, newUsername)
	t.not(newUsername, createdUser.username)

	const newName = 'New Name'
	const withUpdatedName = (await request(app)
		.patch(`/user/${createdUser._id}`)
		.send({ name: newName })).body

	t.is(withUpdatedName.name, newName)
	t.not(withUpdatedName.name, createdUser.name)

	const newAge = 32 // It was 128 before
	const withUpdatedAge = (await request(app)
		.patch(`/user/${createdUser._id}`)
		.send({ age: newAge })).body
	
	t.is(withUpdatedAge.age, newAge)
	t.not(createdUser.age, newAge)

})

test('Delete a User', async t => {
	t.plan(3)
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

	const fetchRes = await request(app)
		.get(`/user/${createdUser._id}`)
	
	t.is(fetchRes.status, 404)
	
	const fetchJsonRes = await request(app)
		.get(`/user/${createdUser._id}/json`)
	
	t.is(fetchJsonRes.status, 404)
})

test('Get list of users', async t => {
	t.plan(5)
	const userToCreate = randUser()

	const createdUser = await request(app)
		.post('/user')
		.send(userToCreate)
	
	t.is(createdUser.status, 200)

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

