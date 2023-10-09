const Service = class {
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