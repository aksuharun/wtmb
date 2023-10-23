import BaseService from './base-service.js'
import UserModel from '../models/user.js'

class UserService extends BaseService{
	model = UserModel

	async joinGroup(user, group) {
		user.groups.push(group)
		group.participants.push(user)
		await user.save()
		await group.save()
		return user.groups
	}
}

export default new UserService()