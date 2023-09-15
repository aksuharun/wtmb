import chalk from 'chalk'
const User = class{
	constructor(username,name,surname,age){
		this.username = username
		this.name = name
		this.surname = surname
		this.age = age
	}

	listUserInfo(){
		console.log(`username: ${chalk.bold(this.username)}`)
	}

	static create({username, name, surname, age}){
		return new User(username, name, surname, age)
	}
}

export default User