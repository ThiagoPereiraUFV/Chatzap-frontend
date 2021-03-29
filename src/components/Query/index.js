import { Form } from "react-bootstrap";


export const Query = ({ setQuery, query, input }) => (
	<Form onSubmit={query}>
		<Form.Group className="m-1 h-100" controlId="input">
			<Form.Control
				type="text"
				style={{ borderRadius: "30px" }}
				placeholder="Busque aqui"
				value={input}
				onChange={(e) => setQuery(e.target.value)}
				required
			/>
		</Form.Group>
	</Form>
);