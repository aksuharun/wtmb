import express from 'express'
const router = express.Router()

import UserSerice from '../services/user-service.js'
import GroupService from '../services/group-service.js'


//	List Users
router.get('/all', async (req,res) => {
  const users = await UserSerice.findAll()
	res.render('list',{items: users})
})

//	Fetch User
router.get('/:id', async (req,res) => {
	const user = await UserSerice.find(req.params.id)
	if(!user) res.status(404)
  res.render('data',{data: user})
})

// Fetch User as Json
router.get('/:id/json', async (req, res) => {
	const user = await UserSerice.find(req.params.id)
	if(!user) res.status(404)
	res.send(user)
})

//	Add User
router.post('/', async (req,res) =>{
	const user = await UserSerice.add(req.body)
	res.send(user)
})

//	Update User
router.post('/update/:id', async (req,res) =>{
	const user = await UserSerice.update(req.params.id, req.body)
	res.send(user)
})

//	Delete User
router.delete('/:id', async (req,res) =>{
	const user = await UserSerice.del(req.params.id)
	res.send(user)
})

//	List Groups of the User
router.get('/:id/groups', async (req,res) =>{
	const user = await UserSerice.find(req.params.id)
	res.render('list', {items: user.groups})
})

//	Add User to a Group
	router.post('/:id/groups', async (req,res) =>{
	const user = await UserSerice.find(req.params.id)
	const group = await GroupService.find(req.body._id)
	await UserSerice.joinGroup(user, group)
	
	res.send(user.groups)
})

export {router as userRouter}