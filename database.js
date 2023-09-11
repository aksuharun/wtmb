import fs from 'fs'

const load = function(filename) {
	return new Promise((resolve, reject)=>{
		fs.readFile(filename, 'utf8', (err, data)=>{
			if(err) return reject(err)
			resolve(JSON.parse(data))
		})
	})
}

const save = function(filename,data){
	return new Promise((resolve, reject)=>{
        fs.writeFile(filename, JSON.stringify(data), (err)=>{
            if(err) return reject(err)
            resolve("File succesfully saved")
        })
    })
}

export default {save, load}