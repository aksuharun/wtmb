import GroupService from './services/group-service.js';
import UserService from './services/user-service.js';
import User from './models/user.js'
import Group from './models/group.js'

const listUsers = (user) => console.log('username:', user.username, 'id:', user.id,)

async function main(){
    const harun = new User('aksuharun','Harun', 'Aksu',19)
    const rumo = new User('rakpinar','Rumeysa Nur','Akpinar',19)    
    await UserService.add(harun)
    await UserService.add(rumo)

    const bootcamp = new Group('NodeJS Bootcamp')
    harun.join(bootcamp)
    rumo.join(bootcamp)
    await GroupService.add(bootcamp)
    
    const groups = await GroupService.findAll()
    groups[0].info()

    var users = await UserService.findAll()
    console.log('List of users in database')
    users.forEach(listUsers)
    
    await UserService.del(2)
    console.log('User 2 Deleted')
    

    console.log('List of users in database')
    users = await UserService.findAll()
    users.forEach(listUsers)
}

main();