import {promises as fsp} from 'fs'
import {parse as flattedParse, stringify as flattedStringify} from 'flatted'

const Service = class {
	constructor(model, dbPath) {
		this.model = model
	}

	async findAll() {
		this.model.find()
	}

	async add(item) {
		this.model.create(item)
	}

	async	del(itemId) {
		this.mode.remove({ _id: itemId })
	}

	async find(itemId) {
		this.model.findById(itemId)
	}
}
export default Service