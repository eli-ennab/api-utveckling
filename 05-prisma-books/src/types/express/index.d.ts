import { User } from '@prisma/client'
import { JwtPayload } from "../../types";

declare global {
	namespace Express {
		export interface Request {
			token: JwtPayload,
			user?: User,
		}
	}
}
