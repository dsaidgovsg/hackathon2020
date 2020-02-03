import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Prompt(props) {
	return (
	<Modal show={props.show} onHide={props.closePrompt}>
	  <Modal.Header closeButton>
		<Modal.Title className={props.status === 'error' ? 'text-danger':'text-primary'}>{props.title || 'Result'}</Modal.Title>
	  </Modal.Header>

	  <Modal.Body>
		<p className={props.status === 'error' ? 'text-danger':''}> {props.message} </p>
	  </Modal.Body>

	  <Modal.Footer>
		{/*<Button variant="secondary">Close</Button>*/}
		<Button variant="primary" onClick={props.closePrompt}>OK</Button>
	  </Modal.Footer>
	</Modal>)
}