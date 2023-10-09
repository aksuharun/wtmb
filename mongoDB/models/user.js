import mongoose from "mongoose"

const PersonSchema = new mongoose.Schema({
	username: String,
	name: String,
	age: Number,
})

const PersonModel = mongoose.model('Person',PersonSchema)

export default PersonModel 