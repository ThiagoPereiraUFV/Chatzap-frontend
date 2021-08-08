//	Importing interfaces
import { User } from "./User";
import { Room } from "./Room";

//	Defining Message interface
export interface Message {
	_id: string,
	text: string,
	room: Room,
	user: User,
	createdAt: Date,
	updatedAt: Date
}
