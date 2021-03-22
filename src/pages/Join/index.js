import { useState } from "react";
import { useHistory } from "react-router-dom";

//	Importing React Bootstrap features
import { Container, Form, Button, Col, Row } from "react-bootstrap";

export const Join = ({ user, setUser }) => {
	//	User and group state variables
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [numberDirect, setNumberDirect] = useState("");
	const [group, setGroup] = useState("");
	const [direct, setDirect] = useState(true);

	const history = useHistory();

	async function join(event) {
		event.preventDefault();

		if(direct) {
			const user = {
				name,
				number,
				numberDirect
			};

			sessionStorage.setItem("user", JSON.stringify(user));
			setUser(user);

			history.push("/direct");
		} else {
			const user = {
				name,
				number,
				group
			};

			sessionStorage.setItem("user", JSON.stringify(user));
			setUser(user);

			history.push("/group");
		}
	}

	return (
		<Container className="m-auto" fluid>
			<Col className="m-auto" lg="3" md="6">
				<Form onSubmit={join}>
					<Row>
						<Form.Group as={Col} controlId="name" sm="12">
							<Form.Label>Seu nome</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nome"
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="phone" sm="12">
							<Form.Label>Seu número</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Número"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="direct">
							<Form.Check
								type="switch"
								label={direct ? "Conversa privada" : "Conversa em grupo"}
								checked={direct}
								onChange={e => setDirect(e.target.checked)}
							/>
						</Form.Group>
						{direct ?
							<Form.Group as={Col} controlId="phoneDirect" sm="12">
								<Form.Label>Número de destino</Form.Label>
								<Form.Control
									type="tel"
									placeholder="Número"
									value={numberDirect}
									onChange={(e) => setNumberDirect(e.target.value)}
									required={direct}
								/>
							</Form.Group>
							:
							<Form.Group as={Col} controlId="group" sm="12">
								<Form.Label>Nome do grupo</Form.Label>
								<Form.Control
									type="text"
									placeholder="Grupo"
									value={group}
									onChange={(e) => setGroup(e.target.value)}
									required={!direct}
								/>
							</Form.Group>
						}
						<Col className="text-center my-2" sm="12">
							<Button
								variant="success"
								type="submit"
								disabled={!name || !number || (direct && !numberDirect) || (!direct && !group)}
							>
								Iniciar
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Container>
	);
}