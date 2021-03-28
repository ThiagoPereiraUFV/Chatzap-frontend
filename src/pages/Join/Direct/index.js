import { useState } from "react";
import { useHistory } from "react-router-dom";

import { motion } from "framer-motion";

//	Importing React Bootstrap features
import { Container, Form, Button, Col, Row } from "react-bootstrap";

import { Footer } from "../../../components/Footer";

//	Importing api to communicate to backend
import api from "../../../services/api";

export const JoinDirect = ({ setUser }) => {
	//	User and group state variables
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [numberDirect, setNumberDirect] = useState("");
	const [nameDirect, setNameDirect] = useState("");

	const history = useHistory();

	async function join(event) {
		event.preventDefault();

		if(number) {
			await api.get("/user/" + number)
			.then((response) => {
				if(response && response.status === 200) {
					if(response.data.exists) {
						alert("Número indisponível!");
					} else {
						const user = {
							name,
							number,
							numberDirect,
							nameDirect
						};

						sessionStorage.setItem("user", JSON.stringify(user));
						setUser(user);

						history.push("/direct");
					}
				}
			}).catch(() => {
				alert("Erro interno!");
			});
		}
	}

	return (
		<motion.div
			as={Container}
			className="m-auto w-100"
			initial={{ opacity: 1}}
			exit={{ opacity: 0 }}
		>
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
						<Form.Group as={Col} controlId="nameDirect" sm="12">
							<Form.Label>Nome do destino</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nome"
								value={nameDirect}
								onChange={(e) => setNameDirect(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="phoneDirect" sm="12">
							<Form.Label>Número de destino</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Número"
								value={numberDirect}
								onChange={(e) => setNumberDirect(e.target.value)}
								required
							/>
						</Form.Group>
						<Col className="text-center my-2" sm="12">
							<Button
								variant="success"
								type="submit"
								disabled={!name || !number || !numberDirect}
							>
								Iniciar
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
			<Footer />
		</motion.div>
	);
}