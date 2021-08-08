//	Importing interfaces
import { Room } from "./Room";
import { UserRoom } from "./UserRoom";

//	Defining User interface
export interface User {
	_id: string,
	username: string,
	name: string,
	phone: string,
	email: string,
	online: boolean,
	image?: Record<string, any>,
	user_rooms: Array<UserRoom>
	rooms: Array<Room>
	createdAt: Date,
	updatedAt: Date
}
