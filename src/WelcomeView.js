import React from 'react';

export default class WelcomeView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {on:true};
	}

	flash() {
		console.log('flashing');
		this.setState({on:!this.state.on});
		this.timer = setTimeout(this.flash.bind(this), this.state.on ? 2000:500);
	}

	componentDidMount() {
		this.flash();
	}

	componentWillUnmount(){
		clearTimeout(this.timer);
	}

	render() {
		return (
        <div id="welcome" className="row flex-xl-nowrap h-100">
            <div className="col-4 py-5 px-4 pl-5" style={{backgroundColor:'#f9f9f9', overflow:'auto'}}>
                <a className="btn btn-primary mr-3 mb-3" href="#" onClick={()=>this.props.changeView('demo')}>Demo - Coronavirus Map</a>
            </div>
            <div className="col-8 px-5 py-3 text-center h-100" style={{backgroundColor:'#e9ecef', overflow:'auto'}}>
                <div className="text-left" style={{display: 'inline-block'}}>
                    <div className="text-center"><img src='../assets/img/hackathon.png' style={{visibility:this.state.on ? 'visible':'hidden'}} width='500' /></div>
                    <h1 className="text-center display-4">Hackathon is cool!</h1>
                    <p className="text-center lead">Let's hack together for social good.</p>
                </div>
				<div className="text-center" style={{backgroundColor:'#e9ecef', position:"absolute", bottom:"0em", left:"0px", right:"0px", paddingBottom:'.5em'}}>
					<span style={{fontSize:"1.4em", marginRight:"-.5em", position:"relative", top:".1em", color:"#454545"}}>Built by</span>
					<img src='../assets/img/govtech-logo.png' width="240"/>
				</div>
            </div>
        </div>)
	}
}