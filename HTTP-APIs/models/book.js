const Book = class{
	constructor(name, author, page, img, tags = [], currentOwner = null, id) {
		this.name = name
		this.author = author
		this.page = page
		this.id = id
	}

	static create({name, author, page, img, tags, currentOwner, id}) {
		return new Book(name, author, page, img, tags, currentOwner, id)
	}
}

export default Book