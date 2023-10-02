const Visitor = class{
	constructor(username, password, fullName , birthYear, ownedBooks = [], id) {
		this.username = username
    this.password = password
		this.fullName = fullName
		this.birthYear = birthYear  
		this.ownedBooks = ownedBooks
		this.id = id
	}

	borrow(book) {
		this.ownedBooks(book)
	}

	static create({username, password, fullName, birthYear, ownedBooks, id}) {
		return new Visitor(username, password, fullName, birthYear, ownedBooks, id)
	}
}

export default Visitor