import mongoose from 'mongoose';

const GroupSchema = mongoose.Schema({
    name: String,
    participants: [String],
})

const GroupModel = mongoose.model('Group', GroupSchema)

export default GroupModel