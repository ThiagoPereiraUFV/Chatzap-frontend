import { Link } from "react-router-dom";

import { Jumbotron } from "react-bootstrap";

import { motion } from "framer-motion";

//	Exporting Not Found page
export const NotFound = () => (
	<motion.div
		className="d-flex flex-row flex-wrap justify-content-around my-auto"
		initial={{ opacity: 0 }}
		exit={{ opacity: 0 }}
		animate={{ opacity: 1 }}
	>
		<Jumbotron  style={{borderRadius: "30px"}} className="my-auto ml-4 mr-auto bg-success" sm="7">
			<h2 className="display-5 font-italic">ERRO 404</h2>
			<h1 className="display-1 text-light font-weight-bold my-auto">Não encontrado</h1>
			<hr className="my-3"/>
			<p className="lead">
				<Link
					to="/"
					className="btn btn-outline-light btn-lg px-3 py-1">
					Voltar
				</Link>
			</p>
		</Jumbotron>
	</motion.div>
);