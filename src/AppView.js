import React from "react";
import { Row, Col } from 'react-bootstrap';

import "./app.css";

import Container from 'react-bootstrap/Container';
import WelcomeView from './WelcomeView';
import Menubar from './Menubar';
import Prompt from './Prompt';

export default class AppView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {view:'welcome', prompt: { show: false }, running:false};
		this.openPrompt = this.openPrompt.bind(this);
		this.closePrompt = this.closePrompt.bind(this);
		this.changeView = this.changeView.bind(this);
	}

	changeView(view) {
	    if (view === 'welcome') {
	    }
		this.setState({ view: view })
	}

	openPrompt(message, options) {
		if (!this.state.prompt.show)
		    this.setState({prompt: {show:true, message:message, ...options}})
		else {
		    // to consider: should we queue the message?
		    console.log("Extra message:", message, options);
		}
	}
	closePrompt() {
		this.setState({prompt:{show: false}})
	}
	
	componentDidMount() {
	}
	componentWillUnmount() {
	}

	render() {
		return (
			<Container fluid='true' test='true' className="d-flex flex-column" style={{ height: '100%', padding: '0px' }}>
				<header className="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar py-0">
				    <Menubar changeView={this.changeView} view={this.state.view}></Menubar>
					<ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
						<li className="nav-item">
							<a className="nav-link p-2" style={{cursor:'pointer'}} onClick={()=>this.changeView('help')} rel="noopener">
								<img src='../assets/img/question-circle-o.svg' /> Help
					  		</a>
						</li>
					</ul>
				</header>

                <div className={"main-row row flex-xl-nowrap flex-grow-1 mx-0 "+ "view-"+this.state.view} style={{overflow:'hidden'}}>
                    <Col className={"main-content bd-content h-100 px-0 col-12"} role="main">
					{((view) => {
						switch (view) {
							case 'welcome': return <WelcomeView setProjects={this.setProjects} projects={this.state.projects} changeView={this.changeView}></WelcomeView>;
							default: return null;
						}
					})(this.state.view)}
                    </Col>
				</div>
				<Prompt {...this.state.prompt} openPrompt={this.openPrompt} closePrompt={this.closePrompt}></Prompt>
			</Container>)
	}
}