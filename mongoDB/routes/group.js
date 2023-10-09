import express from 'express'
const router = express.Router()

import GroupSerice from '../services/group-service.js'


router.get('/all', async (req,res) => {
  const groups = await GroupSerice.findAll()
	res.render('list',{list: groups})
})

router.get('/:id', async (req,res) =>{
	const group = await GroupSerice.find(req.params.id)
    res.render('data',{data: group})
})

router.post('/', async (req,res) =>{
	const group = await GroupSerice.add(req.body)
	res.send(group)
})

router.delete('/:id', async (req,res) =>{
	const group = await GroupSerice.del(req.body.id)
	res.send(group)
})

export {router as groupRouter}