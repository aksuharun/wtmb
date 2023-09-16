const User = class{
    constructor(username, name, sirname, age, groups = [], id) {
        this.username = username
        this.name = name 
        this.sirname = sirname 
        this.age = age 
        this.groups = groups
        this.id = id
    }

    join(group) {
        this.groups.push(group)
        groups.join.push(this)
    }

    static create({username, name, sirname ,age groups, id}) {
        return new User(username, name, sirname, age, groups, id)
    }
}