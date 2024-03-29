import User from './user.js'
const Group = class{
	constructor(name, participants = []){
		this.name = name
		this.participants = participants
	}

	addParticipants(user){
		this.participants.push(user);
	}

	listParticipants(){
		console.log(`Participants of ${this.name}:`)
		this.participants.forEach(printName)
	}
	
	static create({name, participants}){
		const group = new Group(name)
		group.participants = participants.map(User.create)
		return group;
	}
}

const printName = User => console.log(User.name)

export default Group