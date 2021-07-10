import { Dispatch, SetStateAction, FormEvent } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface EnterRoomModalTypes {
	roomId: string,
	setRoomId: Dispatch<SetStateAction<string>>,
	enterRoom(event: FormEvent): Promise<void>,
	enterRoomModal: boolean,
	setEnterRoomModal: Dispatch<SetStateAction<boolean>>
}

export const EnterRoomModal = ({ roomId, setRoomId, enterRoom, enterRoomModal, setEnterRoomModal }: EnterRoomModalTypes) => (
	<Modal show={enterRoomModal} onHide={() => setEnterRoomModal(false)} centered>
		<Modal.Header closeButton>
			<Modal.Title>Entrar em uma sala</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form className="my-3" onSubmit={(e) => {
				enterRoom(e);
				setEnterRoomModal(false);
			}}>
				<Form.Group controlId="roomId">
					<Form.Label>Id da sala</Form.Label>
					<Form.Control
						placeholder="Id"
						type="text"
						value={roomId}
						onChange={(e) => setRoomId(e.target.value)}
						autoComplete="off"
						required
					/>
				</Form.Group>
			</Form>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={() => setEnterRoomModal(false)}>
				Voltar
			</Button>
			<Button
				variant="success"
				onClick={(e) => {
					enterRoom(e);
					setEnterRoomModal(false);
				}}
				disabled={!roomId?.length}
			>
				Entrar
			</Button>
		</Modal.Footer>
	</Modal>
);
