import express from 'express'
const router = express.Router()

import UserSerice from '../services/user-service.js'


router.get('/all', async (req,res) => {
  const users = await UserSerice.findAll()
	res.render('list',{list: users})
})

router.get('/:id', async (req,res) =>{
	const user = await UserSerice.find(req.params.id)
  res.render('data',{data: user})
})

router.post('/', async (req,res) =>{
	const user = await UserSerice.add(req.body)
	res.send(user)
})

router.delete('/:id', async (req,res) =>{
	const user = await UserSerice.del(req.body.id)
	res.send(user)
})

export {router as userRouter}