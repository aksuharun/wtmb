import User from './user.js'
import Group from './group.js'
import {save, load} from './database.js'

const harun = new User('aksuharun', 'Harun', 'Aksu', 19)
const rumeysa = new User('rakpinar', 'Rumeysa Nur', 'Akpinar', 18)


const loadedFile = load('groups.json')

const nodejs = Group.create(loadedFile)

