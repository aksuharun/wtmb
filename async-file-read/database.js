import {promises as fsp} from 'fs'

const load = async (filename) =>{
	try{
		return fsp.readFile(filename,'utf8')
	}
	catch(err){
		console.log(err)
	}
}	

const save = async (filename, data) => {
	try{
    	fsp.writeFile(filename, JSON.stringify(data), 'utf8')
	}
	catch(err){
        console.log(err)
    }
}

export default {save, load}
