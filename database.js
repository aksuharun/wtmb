import fs from 'fs'

const load = function(filename){
	return JSON.parse(fs.readFile(filename,'utf8'))
}

const save = function(filename,data){
	fs.writeFileSync(filename,JSON.stringify(data))
}

export {save, load}