import mongoose, { mongo } from "mongoose"

const PersonSchema = new mongoose.Schema({
	username: String,
	fullName: String,
	age: Number,
})

const PersonModel = mongoose.model('Person',PersonSchema)

export default PersonModel 
