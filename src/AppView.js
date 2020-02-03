import { hot } from 'react-hot-loader';
import React from "react";
import { Col } from 'react-bootstrap';

import "./app.css";

import Container from 'react-bootstrap/Container';
import WelcomeView from './WelcomeView';
import Menubar from './Menubar';
import Demo from './demo-ncov/Demo';

class AppView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {view:'welcome'};
		this.changeView = this.changeView.bind(this);
	}

	changeView(view) {
		this.setState({view: view})
	}

	render() {
		return (
		<Container fluid='true' className="d-flex flex-column" style={{height:'100%', padding:'0px'}}>
			<header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar py-0">
				<Menubar changeView={this.changeView} view={this.state.view}></Menubar>
				<ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
					<li className="nav-item">
						<a className="nav-link p-2" style={{cursor:'pointer'}} onClick={()=>this.changeView('help')}>
							<img src='../assets/img/question-circle-o.svg' /> Help
						</a>
					</li>
				</ul>
			</header>

			<div className={"main-row row flex-xl-nowrap flex-grow-1 mx-0 "+ "view-"+this.state.view} style={{overflow:'hidden'}}>
				<Col className={"main-content bd-content h-100 px-0 col-12"} role="main">
				{((view) => {
					switch (view) {
					case 'welcome': return <WelcomeView changeView={this.changeView}></WelcomeView>;
					case 'demo': return <Demo></Demo>;
					default: return null;
					}
				})(this.state.view)}
				</Col>
			</div>
		</Container>)
	}
}

// export default AppView;
export default hot(module)(AppView);