import { JwtPayload } from "../../types";

declare global {
	namespace Express {
		export interface Request {
			user: JwtPayload,
		}
	}
}
