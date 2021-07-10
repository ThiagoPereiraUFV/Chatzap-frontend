import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as Sentry from "@sentry/react";

import { motion } from "framer-motion";

//	Importing query-string handle feature
import queryString from "query-string";

//	Importing React Bootstrap features
import { Container, Form, Button, Col, Row } from "react-bootstrap";

//	Importing components
import { Push } from "../../../components/Push";

//	Importing api to communicate to backend
import api from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";

export const Signup = ({ location }: { location: any }) => {
	const { setUserToken } = useAuth();
	//	User state variables
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordC, setPasswordC] = useState("");
	const [rememberMe, setRememberMe] = useState(false);

	//	Message settings
	const [pushShow, setPushShow] = useState(false);
	const [message, setMessage] = useState("");
	const [validated, setValidated] = useState(false);

	//	Redirect
	const redirect = queryString.parse(location?.search)?.r;

	const history = useHistory();

	async function handleSignup(event: FormEvent) {
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
						localStorage.setItem("userToken", response.data.token);
					} else {
						sessionStorage.setItem("userToken", response.data.token);
					}

					setUserToken(response.data.token);

					history.push(`/${redirect ?? "chats"}`);
				}
			}).catch((error) => {
				if(!error?.response || error?.response?.status === 500) {
					Sentry.captureException(error);
					setMessage("Erro interno, tente novamente mais tarde");
				} else {
					setMessage("Erro ao criar conta, certifique se os dados são válidos");
				}
				setValidated(true);
				setPushShow(true);
			});
	}

	return (
		<motion.div
			// as={Container}
			className="m-auto w-100"
			initial={{ opacity: 0, x: 300 }}
			exit={{ opacity: 0 }}
			animate={{ opacity: 1, x: 0 }}
		>
			<Push pushShow={pushShow} setPushShow={setPushShow} message={message} />
			<Col className="m-auto" lg="8" md="6">
				<Form noValidate validated={validated} onSubmit={handleSignup}>
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
							<Form.Control.Feedback type="invalid">
								Digite seu nome
							</Form.Control.Feedback>
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
							<Form.Control.Feedback type="invalid">
								Digite um número de telefone válido
							</Form.Control.Feedback>
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
							<Form.Control.Feedback type="invalid">
								Digite uma senha
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="passwordC" sm="6">
							<Form.Label>Confirme sua senha</Form.Label>
							<Form.Control
								type="password"
								placeholder="Confirmação da senha"
								value={passwordC}
								onChange={(e) => setPasswordC(e.target.value)}
								required
							/>
							<Form.Control.Feedback type="invalid">
								Confirme sua senha
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} controlId="rememberMe" sm="6">
							<Form.Label>Lembrar de mim?</Form.Label>
							<Form.Check
								type="switch"
								label={rememberMe ? "Sim" : "Não"}
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
						</Form.Group>
						<Col className="text-center my-2" sm="12">
							<small>Já tem conta? </small>
							<Link className="text-success" to={`/login?r=${redirect ?? "chat"}`}>
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
};
