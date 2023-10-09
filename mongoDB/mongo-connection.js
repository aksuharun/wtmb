import mongoose, { mongo } from "mongoose"

async function main(){
	await mongoose.connect('mongodb://localhost/test')
	console.log('connected to db')
}

main()