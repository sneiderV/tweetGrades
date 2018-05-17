import React, { Component } from 'react';
import Hammer from "react-hammerjs";

export default class Tweet extends Component {
	constructor(props){
		super(props);

		this.handleSwipeLeft=this.handleSwipeLeft.bind(this);
		this.handleSwipeDown=this.handleSwipeDown.bind(this);
		this.handleSwipeRight=this.handleSwipeRight.bind(this);
		this.handleSwipeUp=this.handleSwipeUp.bind(this);
		
	}

	//Por aqui se comunica con la clase padre.
	calificarTweet(){
		this.props.calificarTweet();
	}


	handleSwipeLeft(){
		console.log("handleSwipeLeft");
	}

	handleSwipeDown(){
		console.log("handleSwipeDown");
	}

	handleSwipeRight(){
		console.log("handleSwipeRight");
	}

	handleSwipeUp(){
		console.log("handleSwipeUp");
	}

	render() {
		//Oldie
		// <div className="col">
				// <h6>{this.props.name}</h6>
				// <p>{this.props.date}</p>
				// <p>{this.props.text}</p>
			// </div>

		return (
			
			<Hammer id={this.props.name} className="card" style={{width: 15+'rem'}}
			
				onSwipeLeft={this.handleSwipeLeft}
				onSwipeDown={this.handleSwipeDown} 
				onSwipeRight={this.handleSwipeRight}
				onSwipeUp={this.handleSwipeUp}
			>
				<div className="card-body">
					<div className="media">
						<img src={this.props.profile_image_url} alt="profile image" className="rounded-circle"/>
						<div className="media-body">
							<h5 className="card-title">{this.props.name}</h5>
							{/*<h6 className="card-subtitle mb-2 text-muted">@{this.props.user.screen_name}</h6>*/}
						</div>
					</div>
					<p className="card-text">{this.props.text}</p>
					<h6 className="card-subtitle mb-2 text-muted">{this.props.created_at}</h6>
					<a href={this.props.urls.map((u)=>{return u.expanded_url})}>
						see full tweet
						<img style={{width: 30 , heigth:20 }} src="https://vignette.wikia.nocookie.net/es.starwars/images/9/92/Twitter_Icon.png/revision/latest?cb=20151201204526" alt="profile image" className="rounded-circle"/>
					</a>
				</div>

			</Hammer>
		);
	}
}


