const Visitor = class{
	constructor(firstName, lastName , birthYear, ownedBooks = [], id) {
		this.firstName = firstName 
		this.lastName = lastName 
		this.birthYear = birthYear  
		this.ownedBooks = ownedBooks
		this.id = id
	}

	borrow(book) {
		this.ownedBooks(book)
	}

	static create({firstName, lastName, birthYear, ownedBooks, id}) {
		return new Visitor(firstName, lastName, birthYear, ownedBooks, id)
	}
}

export default Visitor