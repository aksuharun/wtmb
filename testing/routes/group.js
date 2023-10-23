import express from 'express'
const router = express.Router()

import GroupSerice from '../services/group-service.js'

//	List Groups
router.get('/all', async (req,res) => {
  const groups = await GroupSerice.findAll()
	res.render('list',{items: groups})
})


//	List Specific Group
router.get('/:id', async (req,res) =>{
	const group = await GroupSerice.find(req.params.id)
    res.render('data',{data: group})
})

//	Add Group
router.post('/', async (req,res) =>{
	const group = await GroupSerice.add(req.body)
	res.send(group)
})

//	Update Group
router.post('/update/:id', async (req,res) =>{
  const group = await GroupSerice.update(req.params.id, req.body)
  res.send(group)
})

//	Delete Group
router.delete('/:id', async (req,res) =>{
	const group = await GroupSerice.del(req.params.id)
	res.send(group)
})

export {router as groupRouter}