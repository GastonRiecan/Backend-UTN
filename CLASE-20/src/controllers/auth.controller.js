import ENVIROMENT from "../config/enviroment.config.js";
import User from "../models/user.model.js";
import ResponseBuilder from "../utils/builders/responseBuilder.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


export const registerUserController = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const existentUser = await User.findOne({ email: email })

		if (existentUser) {
			const response = new ResponseBuilder()
				.setOk(false)
				.setStatus(400)
				.setMessage('Bad request')
				.setPayload(
					{
						detail: 'User already exists'
					}
				)
				.build()
			return res.status(400).json(response)
		}

		const response = new ResponseBuilder()
			.setOk(true)
			.setStatus(200)
			.setMessage('Created')
			.setPayload({})
			.build()
		res.status(201).json(response)


		//HASHEAR UNA CONTRASEñA CON BCRYPT.
		const hashedPassword = await bcrypt.hash(password, 10)
		const comparacion = await bcrypt.compare(password, "$2b$10$K8.R26nc6PZwwZ3I7dOHNO3CDUW3LsXhv1.fiTx4LRiBb7Y2cnEM2")
		console.log(comparacion);
		console.log(hashedPassword);

		const verificationToken = jwt.sign({ email: email }, ENVIROMENT.JWT_SECRET, {
			expiresIn: '1d'
		})
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			verificationToken: verificationToken,
			emailVerified: false
		})
		await newUser.save()



	} catch (error) {
		console.error('Error registering user:', error);
		const response = new ResponseBuilder()
			.setOk(false)
			.setStatus(500)
			.setMessage('Internal server error')
			.setPayload({
				detail: error.message
			})
			.build()
		res.status(500).json(response)
	}
}