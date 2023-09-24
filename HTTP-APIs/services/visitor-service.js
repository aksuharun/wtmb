import BaseService from './base-service.js'
import VisitorModel from '../models/visitor.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class VisitorService extends BaseService{
		constructor(){
				super(VisitorModel, `${__dirname}/../database/visitor-database.json`)
		}
}

export default new VisitorService()