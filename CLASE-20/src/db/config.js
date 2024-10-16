import ENVIROMENT from '../config/enviroment.config.js';
import mongoose from "mongoose";

console.log(ENVIROMENT);

mongoose.connect(ENVIROMENT.DB_URL)
	.then(
		() => {
			console.log('Database connected OK!')
		})
	.catch(
		(error) => {
			console.error("Error connecting to database")
		})

export default mongoose