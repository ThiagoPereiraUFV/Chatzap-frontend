//	Importing React main module and its features
import React from "react";

//	Importing React Bootstrap features
import { Col } from "react-bootstrap";

//	Exporting resource to routes.js
export function Footer() {
	return (
		<div className="d-flex justify-content-center align-items-end flex-row flex-wrap mt-5 py-1">
			<Col className="text-center p-0 m-0" sm={"auto"}>
				Copyright &#169; {" " + (new Date()).getFullYear() + " |"}
			</Col>
			<Col className="text-center p-0 m-0 ml-1" sm={"auto"}>
				{"Desenvolvido por "}
			</Col>
			<Col className="text-center p-0 m-0 ml-1" sm={"auto"}>
				<a
					className="text-success"
					href="https://github.com/ThiagoPereiraUFV"
					target="_blank"
					rel="noreferrer"
				>
					Thiago Pereira
				</a>
			</Col>
		</div>
	);
}