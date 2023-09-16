const Group = class{
    constructor(name, participants = [], id) {
        this.name = name
        this.participants = participants
        this.id = id
    }

    info() {
        console.log('The group', this.name, 'has', this.participants.length, 'participants')
    }

    static create({name, participants, id}) {
        return new Group(name, participants, id)
    }
}