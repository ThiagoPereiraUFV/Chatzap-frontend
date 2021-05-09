//	Importing React Bootstrap features
import { Toast } from "react-bootstrap";

export const Push = {
	Top: function Top({ pushShow, setPushShow, message, title }) {
		return (
			<div
				aria-live="polite"
				aria-atomic="true"
				style={{
					position: "fixed",
					top: "7%",
					right: "2%",
					zIndex: 5
				}}
			>
				<Toast show={pushShow} onClose={() => setPushShow(false)} delay={3000} autohide>
					<Toast.Header>
						<strong className="mr-auto">{title}</strong>
					</Toast.Header>
					<Toast.Body>{message}</Toast.Body>
				</Toast>
			</div>
		);
	},

	Bottom: function Bottom({ pushShow, setPushShow, message, title }) {
		return (
			<div
				aria-live="polite"
				aria-atomic="true"
				style={{
					position: "fixed",
					right: "2%",
					bottom: "3%",
					zIndex: 5
				}}
			>
				<Toast show={pushShow} onClose={() => setPushShow(false)} delay={3000} autohide>
					<Toast.Header>
						<strong className="mr-auto">{title}</strong>
					</Toast.Header>
					<Toast.Body>{message}</Toast.Body>
				</Toast>
			</div>
		);
	}
};
