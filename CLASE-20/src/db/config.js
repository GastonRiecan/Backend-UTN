import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)
	.then(() => {
		console.log('Database connected OK!')
	})
	.catch((err) => {
		console.log("Error connecting to database", err)
	})

export default mongoose