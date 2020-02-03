import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export default function Menubar(props) {
	function changeView(event, target) {
		props.changeView(target || event.target.target);
	}

	return (
	<Navbar id="menubar" className="h-100 py-0">
		<Navbar.Brand className="navbar-brand p-2" onClick={(e)=>changeView(e, 'welcome')} style={{cursor:'pointer'}}>
			Hackathon 2020
		</Navbar.Brand>
		<Navbar.Collapse className="h-100">
			<Nav className="mr-auto h-100">
				<Nav.Link className={props.view==='demo1'?'active':''} target="demo1" onClick={changeView}>Demo 1</Nav.Link>
				<Nav.Link className={props.view==='demo2'?'active':''} target="demo2" onClick={changeView}>Demo 2</Nav.Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>)
}