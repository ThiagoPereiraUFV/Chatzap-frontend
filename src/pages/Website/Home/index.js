import { Container, Jumbotron, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import zap from "../../../assets/zap.ico";

//	Exporting Home page
export const Home = ({ userToken }) => (
	<motion.div
		as={Container}
		className="my-auto px-4"
		initial={{ opacity: 0, y: -100 }}
		exit={{ opacity: 0 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ ease: "easeOut", duration: 1 }}
	>
		<Jumbotron as={Col} style={{borderRadius: "30px"}} className="py-4 bg-success" sm="7">
			<h2 className="display-5 font-italic">Bora conversar!</h2>
			<Row className="m-auto">
				<h1 className="display-1 text-light font-weight-bold my-auto">Chatzap</h1>
				<Image height="70" src={zap} />
			</Row>
			<hr className="my-3"/>
			{userToken && userToken.length ?
				<>
					<p>Converse agora</p>
					<p className="lead">
						<Link
							to="/chat"
							className="btn btn-outline-light btn-lg px-3 py-1"
						>
							Minhas conversas
						</Link>
					</p>
				</>
				:
				<>
					<p>Entre agora</p>
					<p className="lead">
						<Link
							to="/login"
							className="btn btn-outline-light btn-lg px-3 py-1"
						>
							Entrar
						</Link>
					</p>
				</>
			}
		</Jumbotron>
	</motion.div>
);
