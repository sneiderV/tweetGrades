import React, { Component } from 'react';
import Hammer from "react-hammerjs";
import moment from "moment";
import * as toastr from "toastr";

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
		this.props.calificarTweet(
			this.props.twitteruser,
			this.leftpoints, 
			this.props.id_str,
			this.posicionClase()
			);
	}

	handlePressDown(){
		this.props.calificarTweet(
			this.props.twitteruser,
			this.downpoints, 
			this.props.id_str,
			this.posicionClase()
			);

	}

	handleSwipeRight(){
		this.props.calificarTweet(
			this.props.twitteruser,
			this.rightpoints, 
			this.props.id_str,
			this.posicionClase()
			);

	}

	//A partir de la fecha me dice a que clase pertenece
	posicionClase(){
		// El objetivo es sabe la posición de la clase en el arreglo
		let posClase =-1;
		// Tue May 08 12:46:58 +0000 2018
		// console.log("splDate",this.props.created_at,typeof(this.props.created_at));
		let splDate = this.props.created_at.split(" ");
		let dia = splDate[0];
		let mes = splDate[1];
		let numDia = splDate[2];
		// Asumimos que solo existe la sección 2
		if(mes==="May"){
			//desde el sabado pueden tweetear
			if(numDia>11){
				if(numDia>14 && numDia<=19)	return 25;
				if(numDia<=14) return 24;
			}
			else if(numDia>4){
				if(numDia>7 && numDia<=11)	return 23;
				if(numDia<=7) return 22;
			}
			else{
				return 21;
			}

		}
		if(mes==="Apr"){
			if(numDia>27)
				return 20;
		}
		//probablemente esto sea -1, debe ser manejado como tweet fuera de tiempo
		return posClase;

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
					<h6 className="card-subtitle mb-2 text-muted">{moment(this.props.created_at).toString()}</h6>
					<a href={this.props.urls.map((u)=>{return u.expanded_url})}>
						see full tweet
						<img style={{width: 30 , heigth:20 }} src="https://vignette.wikia.nocookie.net/es.starwars/images/9/92/Twitter_Icon.png/revision/latest?cb=20151201204526" alt="profile image" className="rounded-circle"/>
					</a>
				</div>

			</Hammer>
		);
	}
}


