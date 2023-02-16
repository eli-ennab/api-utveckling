import { model, Schema, Document } from "mongoose"

export interface IDirector extends Document {
	title: string,
}

const DirectorSchema: Schema = new Schema<IDirector>({
	title: {
		type: String, 		// validation
		required: true, 	// validation
		trim: true, 		// sanitazition
		minlength: 6,
		// unique: true,
	},
})

export const Director = model<IDirector>('Director', DirectorSchema)
