import { model, Schema, Document } from "mongoose"

export interface IMovie extends Document {
	title: string,
	runtime?: number,
	releaseYear?: number,
	genre?: string,
	watched?: Date,
}

const MovieSchema: Schema = new Schema<IMovie>({
	title: {
		type: String, 		// validation
		required: true, 	// validation
		trim: true, 		// sanitazition
		minlength: 3,
		unique: true,
	},
	runtime: {
		type: Number,
		min: 1,
		default: null,
	},
	releaseYear: {
		type: Number,
		min: 1888,
		max: new Date().getFullYear(),
	},
	genre: {
		type: String,
		lowercase: true,
		enum: ["action", "sci-fi", "bromance", "realism"],
	},
	watched: {
		type: Date,
		default: Date.now(),
		max: Date.now(),
	}
})

export const Movie = model<IMovie>('Movie', MovieSchema)
