//	Importing interfaces
import { Message } from "./Message";
import { User } from "./User";
import { UserRoom } from "./UserRoom";

//	Defining Room interface
export interface Room {
	id: string,
	_id: string,
	name: string,
	image?: Record<string, any>,
	user_rooms: Array<UserRoom>,
	messages: Message
	owner: User,
	createdAt: Date,
	updatedAt: Date
}
