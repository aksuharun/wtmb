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

	async checkLogin(username, password){
		const visitors = await this.findAll()
		let result
		
		visitors.forEach(visitor => {
			if(visitor.username == username && visitor.password == password){
				result = {success:true, visitorId:visitor.id}
			}
		})
		console.log("RESULT",result,"\n\n")
		if(result != undefined){
			return result
		}
		return {success:false}
	}

	async checkSignup(username){
		const visitors = await this.findAll()
		const result = visitors.forEach(visitor => {
      if(visitor.username === username){
        return {success:false}
      }
    })
		
		if(result!= undefined){
      return result
    }

		return {success:true}
	}
}

export default new VisitorService()   
      