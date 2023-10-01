const Book = class{
	constructor(name, author, publisher, page, img, currentOwner, id) {
		this.name = name
		this.publisher = publisher
		this.author = author
		this.page = page
		this.img = img
		this.id = id
	}

	static create({name, author, publisher, page, img, currentOwner, id}) {
		return new Book(name, author, publisher, page, img, currentOwner, id)
	}
}

export default Book