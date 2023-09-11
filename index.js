import User from './user.js'
import Group from './group.js'
import Database from './database.js'

async function loadGroup(filename){
    const group = await Database.load(filename)
    return Group.create(group);
}

const school = await loadGroup('groups.json')
console.log('First Partisipant\'s info:')
school.participants[0].listUserInfo()
