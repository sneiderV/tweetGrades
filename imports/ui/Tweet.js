import React, { Component } from 'react';
import Hammer from "react-hammerjs";

export default class Tweet extends Component {
	constructor(props){
		super(props);

		this.handleSwipeLeft=this.handleSwipeLeft.bind(this);
		this.handlePressDown=this.handlePressDown.bind(this);
		this.handleSwipeRight=this.handleSwipeRight.bind(this);

		this.leftpoints=0;
		this.downpoints=1;
		this.rightpoints=2;
		
	}

	//Por aqui se comunica con la clase padre.
	handleSwipeLeft(){
		this.props.calificarTweet(this.props.twitteruser,this.leftpoints);
	}

	handlePressDown(){
		this.props.calificarTweet(this.props.twitteruser,this.downpoints);
	}

	handleSwipeRight(){
		this.props.calificarTweet(this.props.twitteruser,this.rightpoints);
	}



	render() {

		return (
			
			<Hammer id={this.props.name} className="card" style={{width: 15+'rem'}}
			
				onSwipeLeft={this.handleSwipeLeft}
				onPress={this.handlePressDown} 
				onSwipeRight={this.handleSwipeRight}
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


