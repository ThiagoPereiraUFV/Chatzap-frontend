import { Form } from "react-bootstrap";


export const Query = ({ query, setQuery, handleQueryChat }) => (
	<Form onSubmit={handleQueryChat}>
		<Form.Group className="m-1 h-100" controlId="input">
			<Form.Control
				type="text"
				style={{ borderRadius: "30px" }}
				placeholder="Busque aqui"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				required
			/>
		</Form.Group>
	</Form>
);