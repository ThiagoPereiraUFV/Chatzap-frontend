import { Form } from "react-bootstrap";


export const Query = ({ query, setQuery }) => (
	<Form onSubmit={(e) => e.preventDefault()}>
		<Form.Group className="m-1 h-100" controlId="input">
			<Form.Control
				type="text"
				style={{ borderRadius: "30px" }}
				placeholder="Busque aqui"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				maxLength="50"
				autoComplete="off"
			/>
		</Form.Group>
	</Form>
);
