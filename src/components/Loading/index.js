//	Importing React Bootstrap features
import { Container, Spinner } from "react-bootstrap";

//	Exporting component
export function Loading({ animation }) {
	return (
		<Container className="d-flex h-100" fluid>
			<Spinner
				className="m-auto"
				style={{width: "8rem", height: "8rem"}}
				animation={animation ? animation : "border"}
				variant="success"
			/>
		</Container>
	);
}
