import mongoose from 'mongoose'
const Schema = mongoose.Schema
const user = new Schema(
	{
        username: {type: String, default: null},
		email: {type: String, default: null},
		password: {type: String, default: null},
        birthdate: {type: Date, default: null}
	},
	{
		timestamps: true,
	}
)
export default mongoose.model('users', user)