import User from './user.js'
import Group from './group.js'
import {save, load} from './database.js'

const harun = new User('aksuharun', 'Harun', 'Aksu', 19)
const rumeysa = new User('rakpinar', 'Rumeysa Nur', 'Akpinar', 18)

const callback = function(err,loadedFile){
    if(err){
        console.log('An error occured',err);
        return
    }else{
        console.log('file loaded')
        const nodejs = Group.create(loadedFile)
        console.log(nodejs)
    }
}

load('groups.json',callback)
console.log('hi');
