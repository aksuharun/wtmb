import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate'

const GroupSchema = mongoose.Schema({
    name: String,
    participants: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    }],
})

GroupSchema.plugin(autopopulate)
const GroupModel = mongoose.model('Group', GroupSchema)

export default GroupModel