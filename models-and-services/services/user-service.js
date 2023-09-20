import BaseService from './base-service.js'
import UserModel from '../models/user.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class UserService extends BaseService{
		constructor(){
				super(UserModel, `${__dirname}/../database/user-database.json`)
		}
}

export default new UserService()