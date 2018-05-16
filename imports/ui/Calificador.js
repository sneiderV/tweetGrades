import React, { Component } from 'react';
import { withTracker } from "meteor/react-meteor-data";
import { Students } from "../api/students.js";


class Calificador extends Component {
	

	cargarHome(){
		alert("regresando a pagina de estudiante");
		FlowRouter.go("/");
	}	

	render() {
		if(!this.props.currentUser)
			this.cargarHome();

		return (
			<div> Pantalla para calificar </div>
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
