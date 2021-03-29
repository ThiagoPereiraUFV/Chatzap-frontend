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

export const Signup = ({ setUser, setUserId, location }) => {
	//	User state variables
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordC, setPasswordC] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	//	Message settings
	const [toastShow, setToastShow] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	//	Redirect
	const redirect = queryString.parse(location?.search)?.r;

	const history = useHistory();

	async function handleSignup(event) {
		event.preventDefault();

		const data = {
			name,
			phone,
			email,
			password,
			passwordC
		};

		await api.post("/user", data)
			.then((response) => {
				if(response && response.status === 201) {
					if(rememberMe) {
						localStorage.setItem("userId", response.data.token);
					} else {
						sessionStorage.setItem("userId", response.data.token);
					}

					setUserId(response.data.token);
					setUser(response.data.user);

					history.push(`/${redirect ?? ""}`);
				}
			}).catch((error) => {
				setTitle("Erro!");
				if(error.response && error.response.status === 400) {
					const messages = error.response.data;
					setMessage(messages.errors ? messages.errors.join(", ") : messages);
				} else if(error.response && error.response.status === 500) {
					setMessage(error.message);
				}
				setToastShow(true);
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
			<Push.Top toastShow={toastShow} setToastShow={setToastShow} message={message} title={title} />
			<Col className="m-auto" lg="8" md="6">
				<Form onSubmit={handleSignup}>
					<Row>
						<Form.Group as={Col} controlId="name" sm="6">
							<Form.Label>Seu nome</Form.Label>
							<Form.Control
								type="text"
								placeholder="ex. Mateus"
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="phone" sm="6">
							<Form.Label>Seu número</Form.Label>
							<Form.Control
								type="tel"
								placeholder="ex. (31) 99999-9999"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="email" sm="6">
							<Form.Label>Seu email</Form.Label>
							<Form.Control
								type="email"
								placeholder="ex. exemplo@provedor.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Text muted>Opcional</Form.Text>
						</Form.Group>
						<Form.Group as={Col} controlId="password" sm="6">
							<Form.Label>Sua senha</Form.Label>
							<Form.Control
								type="password"
								placeholder="Senha"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="passwordC" sm="6">
							<Form.Label>Confirme sua senha</Form.Label>
							<Form.Control
								type="passwordC"
								placeholder="Confirmação da senha"
								value={passwordC}
								onChange={(e) => setPasswordC(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId="rememberMe" sm="6">
							<Form.Label>Lembrar de mim?</Form.Label>
							<Form.Check
								type="switch"
								label={rememberMe ? "Sim" : "Não"}
								checked={rememberMe}
								onChange={e => setRememberMe(e.target.checked)}
							/>
						</Form.Group>
						<Col className="text-center my-2" sm="12">
							<small>Já tem conta? </small>
							<Link className="text-success" to="/login">
								<small>Clique aqui</small>
							</Link>
							<small> para acessar</small>
						</Col>
						<Col className="text-center my-2" sm="12">
							<Button
								variant="success"
								type="submit"
								disabled={!name || !phone || !password || !passwordC}
							>
								Continuar
							</Button>
						</Col>
					</Row>
				</Form>
			</Col>
		</motion.div>
	);
}