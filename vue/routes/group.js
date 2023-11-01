import express from 'express'
const router = express.Router()

import GroupSerice from '../services/group-service.js'

//	List All Groups
router.get('/all', async (req,res) => {
  const groups = await GroupSerice.findAll()
	res.render('list',{items: groups})
})

// Fetch All Groups as JSON
router.get('/all/json', async (req,res) => {
	const groups = await GroupSerice.findAll()
	if(!groups && groups.length <= 0) res.status(404)
	res.send(groups)
})
//	Fetch Group
router.get('/:id', async (req,res) =>{
	const group = await GroupSerice.find(req.params.id)
  if(!group) res.status(404)
	res.render('data',{data: group})
})

//Fetch Group as JSON

router.get('/:id/json', async (req,res) =>{
	const group = await GroupSerice.find(req.params.id)
	if(!group) res.status(404)
	res.send(group)
})

//	Add Group
router.post('/', async (req,res) =>{
	const group = await GroupSerice.add(req.body)
	res.send(group)
})

//	Update Group
router.patch('/:id', async (req, res) =>{
  const group = await GroupSerice.update(req.params.id, req.body)
	if(!group) res.status(404)
  res.send(group)
})

//	Delete Group
router.delete('/:id', async (req,res) =>{
	const group = await GroupSerice.del(req.params.id)
	res.send(group)
})

export {router as groupRouter}