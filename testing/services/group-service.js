import BaseService from './base-service.js'
import GroupModel from '../models/group.js'

class GroupService extends BaseService{
	model = GroupModel
}

export default new GroupService()