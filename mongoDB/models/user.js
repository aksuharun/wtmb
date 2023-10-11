import mongoose from "mongoose"
import autopopulate from "mongoose-autopopulate"

const UserSchema = new mongoose.Schema({
	username:{
		type: String,
    required: true,
    minlength:2,
		unique: true
	} ,
	name: {
		type: String,
    required: true,
		minlength:2
	},
	age: {
		type: Number,
    required: true,
    min:13
	},
	groups: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref:'Group',
		autopopulate: {
      maxDepth: 1
    }
	}]
})

UserSchema.plugin(autopopulate)
const UserModel = mongoose.model('User',UserSchema)

export default UserModel 