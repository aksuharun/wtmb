import BaseService from './base-service.js'
import GroupModel from '../models/group.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class GroupService extends BaseService{
    constructor(){
        super(GroupModel, `${__dirname}/../database/group-database.json`)
    }
}

export default new GroupService()