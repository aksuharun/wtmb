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
	
	static create(obj){
		return new Group(obj.name, obj.participants)
	}
}

const printName = User => console.log(User.name)

export default Group