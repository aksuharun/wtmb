import User from './user.js'
import Group from './group.js'
import Database from './database.js'

async function loadGroup(filename){
        const group = await Database.load(filename)
        return Group.create(JSON.parse(group));
}


async function saveGroup(filename, data){
    Database.save(filename, data)
}

const ubeyt = new User('ubo','Ubeyt Sakir', 'Turna', 18)

const school = await loadGroup('groups.json')
school.addParticipants(ubeyt)

saveGroup('groups.json', school)