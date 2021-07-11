//	Importing React Bootstrap features
import { Container, Spinner, SpinnerProps } from "react-bootstrap";

//	Exporting component
export function Loading(props: SpinnerProps) {
	return (
		<Container className="d-flex h-100" fluid>
			<Spinner
				className="m-auto"
				style={{width: "8rem", height: "8rem"}}
				variant="success"
				{...props}
			/>
		</Container>
	);
}
