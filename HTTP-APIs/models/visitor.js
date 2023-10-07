const Visitor = class{
	constructor(username, password, fullName , birthYear, borrowedBooks = [], id) {
		this.username = username
    this.password = password
		this.fullName = fullName
		this.birthYear = birthYear  
		this.borrowedBooks = borrowedBooks
		this.id = id
	}

	borrow(book) {
		this.borrowedBooks.push(book.id)
		return book
	}

	static create({username, password, fullName, birthYear, borrowedBooks, id}) {
		return new Visitor(username, password, fullName, birthYear, borrowedBooks, id)
	}
}

export default Visitor