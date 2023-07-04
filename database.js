import fs from 'fs'

const load = function(filename,callback){
	fs.readFile(filename,'utf8',(err, file) => {
		console.log('error:'+err,"file:"+file)
		if(err){
			console.log("There is a read error")
			callback(err)
			return
		}else{
			callback(null,JSON.parse(file));
		}
	})
}

const save = function(filename,data){
	fs.writeFileSync(filename,JSON.stringify(data))
}

export {save, load}