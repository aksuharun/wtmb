const Book = class{
    constructor(name, author, page, id) {
        this.name = name
        this.author = author
        this.page = page
        this.id = id
    }

    static create({name, author, page, id}) {
        return new Group(name, author, page, id)
    }
}

export default Book