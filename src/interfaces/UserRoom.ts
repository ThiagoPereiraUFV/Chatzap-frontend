//	Importing interfaces
import { Room } from "./Room";
import { User } from "./User";

//	Defining UserRoom interface
export interface UserRoom {
	_id: string,
	user: User,
	room: Room,
	createdAt: Date,
	updatedAt: Date
}
