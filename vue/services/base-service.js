const Service = class {
	async findAll() {
		return await this.model.find()
	}

	async add(item) {
		return await this.model.create(item)
	}

	async	del(itemId) {
		return await this.model.deleteOne({ _id: itemId })
	}

	async find(itemId) {
		return await this.model.findById(itemId)
	}

	async update(itemId, update) {
		return await this.model.findOneAndUpdate(
			{ _id: itemId }, 
			update, 
			{returnOriginal: false})
	}
}
export default Service