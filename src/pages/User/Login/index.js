import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { motion } from "framer-motion";

//	Importing query-string handle feature
import queryString from "query-string";

//	Importing React Bootstrap features
import { Container, Form, Button, Col, Row } from "react-bootstrap";

//	Importing components
import { Push } from "../../../components/Push";

//	Importing api to communicate to backend
import api from "../../../services/api";

export const Login = ({ setUser, setUserToken, location }) => {
	//	User state variables
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	//	Message settings
	const [pushShow, setPushShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Redirect
	const redirect = queryString.parse(location?.search)?.r;

	const history = useHistory();

	async function handleLogin(event) {
		event.preventDefault();

		const data = {
			phone,
			password
		};

		await api.post("/session", data)
			.then((response) => {
				if(response && response.status === 201) {
					if(rememberMe) {
						localStorage.setItem("userToken", response.data.token);
					} else {
						sessionStorage.setItem("userToken", response.data.token);
					}

					setUserToken(response.data.token);
					setUser(response.data.user);

					history.push(`/${redirect ?? "chat"}`);
				}
			}).catch((error) => {
				setTitle("Erro!");
				if(error.response && [400, 404].includes(error.response.status)) {
					const messages = error.response.data;
					setMessage(messages.errors ? messages.errors.join(", ") : messages);
				} else if(error.response && error.response.status === 500) {
					setMessage(error.message);
				}
				setPushShow(true);
			});
	}

	return (
		<motion.div
			as={Container}
			className="m-auto w-100"
			initial={{ opacity: 0, x: 300 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, x: 0 }}
		>
			<Push.Top pushShow={pushShow} setPushShow={setPushShow} message={message} title={title} />
			<Col className="m-auto" sm="3">
				<Form onSubmit={handleLogin}>
					<Row>
						<Form.Group as={Col} controlId="phone" sm="12">
							<Form.Label>Seu número</Form.Label>
							<Form.Control
								type="tel"
								placeholder="ex. (31) 99999-9999"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="password" sm="12">
							<Form.Label>Sua senha</Form.Label>
							<Form.Control
								type="password"
								placeholder="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="rememberMe" sm="12">
							<Form.Check
								type="switch"
								label="Lembrar de mim?"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
						</Form.Group>
						<Col className="text-center my-2" sm="12">
							<small>Não tem conta? </small>
							<Link className="text-success" to={`/signup?r=${redirect ?? "chat"}`}>
								<small>Clique aqui</small>
							</Link>
							<small> para se cadastrar</small>
						</Col>
						<Col className="text-center my-2" sm="12">
							<Button
								variant="success"
								type="submit"
								disabled={!phone || !password}
							>
								Continuar
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</motion.div>
	);
};
