import { Modal, Form, Button } from "react-bootstrap";

export const CreateRoomModal = ({ roomName, setRoomName, createRoom, createRoomModal, setCreateRoomModal }) => (
	<Modal size="md" show={createRoomModal} onHide={() => setCreateRoomModal(false)} centered>
		<Modal.Header closeButton>
			<Modal.Title>Criar sala</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form className="my-3" onSubmit={(e) => {
				createRoom(e); setCreateRoomModal(false);
			}}>
				<Form.Group controlId="roomName">
					<Form.Label>Nome da sala</Form.Label>
					<Form.Control
						placeholder="Nome"
						type="text"
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
						autoComplete="off"
						required
					/>
				</Form.Group>
			</Form>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="secondary" onClick={() => setCreateRoomModal(false)}>
				Voltar
			</Button>
			<Button
				variant="success"
				onClick={(e) => {
					createRoom(e); setCreateRoomModal(false);
				}}
				disabled={!roomName?.length}
			>
				Criar
			</Button>
		</Modal.Footer>
	</Modal>
);
