import mongoose from "mongoose"

async function main(){
		await mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true})
			.then(console.log('Connected to MongoDB'))
			.catch(console.error)
}

main()