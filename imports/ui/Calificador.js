import React, { Component } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Students } from "../api/students.js";
import * as d3 from "d3";
//components
import Tweet from "./Tweet.js";
import AccountsUI from "./AccountsUI.js";


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
      let tweets = res.statuses;
			if(this.props.students.length>0)
      	tweets.forEach((t)=>{
      		return t.seccion=this.encontrarSeccion(t.user.screen_name);
      	});
      this.setState({
      	tweets:tweets
      });
	  }); 
	}

	componentDidMount() {
		//Actualizar texto de login
		d3.select(".sign-in-text").text("Want to see student view? Sign out! ");

		//Actualizar tweets
		this.darTweets();
	}

	//A cada tweet se le debe pasar esta funcion, para que haga render
	calificarTweet(twitteruser, puntos){
		//Agregar puntaje
		console.log("calificar Tweet de "+twitteruser+" con "+puntos+" puntos");
		//agregar id de tweet
	}

	encontrarSeccion(screen_name){
		let seccion = 0;
		let secciones = this.props.students.filter((s)=>{
			let comp = s.twitteruser===screen_name
			return comp;
		});
		if(secciones[0])
			seccion = secciones[0].seccion;
		return seccion;
	}

	render() {
		if(!this.props.currentUser)
			this.cargarHome();

		return (

			<div>
				<AccountsUI/>
				<div className="row">
					<div id="left-bar-calificador" className="col-4 bar-calificador"> 
						<div>
							<h4>Grade your students: </h4>
							<div className="alert alert-success">Swipe right <b>(2 points)</b> if the tweet is interesting and original </div>
							<div className="alert alert-warning">Press and hold down <b>(1 point)</b> if the tweet is interesting but was said before</div>
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
					<div id="right-bar-calificador" className="col-8 bar-calificador">
						<h4> Grade the latest tweets!</h4> 
						<div className="row">
						{this.state.tweets
							//Solo si tiene seccion valida (eliminar cuentas raras)
							.filter((t)=>t.seccion>0)
							//TODO Solo si no he calificado (comparar con idTweet de students)
							//Le paso los params necesarios a los que quedan
							.map((t)=>(
							<Tweet 
								key={t.id_str} profile_image_url={t.user.profile_image_url} 
								twitteruser={t.user.screen_name} name={t.user.name} 
								created_at={t.created_at} text={t.text}
								urls={t.entities.urls} calificarTweet={this.calificarTweet}
								seccion={t.seccion}
								/>
							))}	
						</div>
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
