import express from 'express'
const router = express.Router()

import UserSerice from '../services/user-service.js'


router.get('/all', async (req,res) => {
  const users = await UserSerice.findAll()
	console.log(users)
	if(users === undefined){
		res.send('There are no users')
	}
	res.send(users)
})

export {router as userRouter}