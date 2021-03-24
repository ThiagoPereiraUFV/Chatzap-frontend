import { Jumbotron, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { Footer } from "../../../components/Footer";

import zap from "../../../assets/zap.ico";

//	Exporting Home page
export const Home = () => (
	<motion.div
		className="d-flex flex-row flex-wrap justify-content-around my-auto"
		initial={{ opacity: 0, y: -100 }}
		exit={{ opacity: 0 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ ease: "easeOut", duration: 1 }}
	>
		<Jumbotron as={Col} style={{borderRadius: "30px"}} className="py-3 m-2 bg-success" sm="7">
			<h2 className="display-5 font-italic">Bora conversar!</h2>
			<Row className="m-auto">
				<h1 className="display-1 text-light font-weight-bold my-auto">Chatzap</h1>
				<Image height="70" src={zap} />
			</Row>
			<hr className="my-3"/>
			<p>Entre em um grupo</p>
			<p className="lead">
				<Link
					to="/joinGroup"
					className="btn btn-outline-light btn-lg px-3 py-1">
					Entrar
				</Link>
			</p>
		</Jumbotron>

		<Jumbotron as={Col} style={{borderRadius: "30px"}} className="py-3 m-2 bg-success" sm="4">
			<h2 className="display-5 font-italic">Se deseja privacidade</h2>
			<Row className="m-auto">
				<h1 className="display-1 text-light font-weight-bold my-auto">Ou...</h1>
			</Row>
			<hr className="my-3"/>
			<p>Envie uma mensagem privada</p>
			<p className="lead">
				<Link
					to="/joinDirect"
					className="btn btn-outline-light btn-lg px-3 py-1">
					Enviar
				</Link>
			</p>
		</Jumbotron>
		<Footer />
	</motion.div>
);