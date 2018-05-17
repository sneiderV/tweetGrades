import React, { Component } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Students } from "../api/students.js";
import * as d3 from "d3";
//components
import Tweet from "./Tweet.js"


class Calificador extends Component {

	constructor(props){
		super(props);

		this.state={
			tweets:[],
			section1Count:0,
			section2Count:0
		}

		this.calificarTweet=this.calificarTweet.bind(this);
	}
	

	cargarHome(){
		// alert("regresando a pagina de estudiante");
		FlowRouter.go("/");
	}	

	//devuelve todos los tweets de la clase, es decir, los que tienen #WebDev @Uniandes
	darTweets(){
		Meteor.call('darTweets',(err,res) => {
            if(err) throw err;
            console.log(">> Tweet data received");
            this.setState({
            	tweets:res.statuses
            });
        }); 
	}

	componentDidMount() {
		//Actualizar texto de login
		d3.select("#login > .headerlogin > center > p > .sign-in-text").text("Want to see student view? Sign out, ");

		//Actualizar tweets
		this.darTweets();
	}

	//A cada tweet se le debe pasar esta funcion, para que haga render
	calificarTweet(){
		console.log("califcar Tweet");
	}

	render() {
		if(!this.props.currentUser)
			this.cargarHome();

		return (
			<div className="row">
				<div id="left-bar-calificador" className="col-4 bar-calificador"> 
					<div>
						<h4>Grade your students: </h4>
						<div className="alert alert-success">Swipe right <b>(2 points)</b> if the tweet is interesting and original </div>
						<div className="alert alert-warning">Swipe down <b>(1 point)</b> if the tweet is interesting but was said before</div>
						<div className="alert alert-danger">Swipe left <b>(0 points)</b> if the tweet is not interesting nor original </div>
						<div className="alert alert-secondary">If the student didn't tweet, (s)he gets <b>-1 points</b> by default</div>
					</div>
					<div>
						<h4>Count</h4>
						<p>Es decir en total cuantos tweets se han calificado</p>
					</div>
					<div>
						<h4> Seccion 1:</h4>
						<p>Faltan 3</p>
						<h4> Seccion 2:</h4>
						<p>Faltan 5</p>
					</div>
					<div></div>
				</div>

				{/*Aqui va lo de hammer*/}
				<div id="right-bar-calificador" className="col-8 bar-calificador"> Hammer Bar 
					<div className="row">
					{this.state.tweets.map((t)=>(<Tweet key={t.id_str} profile_image_url={t.user.profile_image_url} name={t.user.name} created_at={t.created_at} text={t.text}
						urls={t.entities.urls} calificarTweet={this.calificarTweet}/>))}	
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker(()=>{
	//Se suscribe a la publicación de students
	Meteor.subscribe("students");

	return {
		students: Students.find({}, {sort: {createdAt: -1}}).fetch(),
		currentUser: Meteor.user()
	};

})(Calificador);
