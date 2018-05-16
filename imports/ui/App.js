
import React, { Component } from 'react';
import { Students } from "../api/students.js";
import "./css/app.css"
import { withTracker } from "meteor/react-meteor-data";
import * as d3 from "d3";
import knob from 'jquery-knob';
import $ from 'jquery';
import AccountsUI from "./AccountsUI.js";
import ReactDOM from 'react-dom';

class App extends Component{
	constructor(props){
		super(props);
		this.svg = React.createRef();
		// this.componentDidMount = this.componentDidMount.bind(this);

		this.darTweets = this.darTweets.bind(this);
		this.getTweetsStudent = this.getTweetsStudent.bind(this);
		this.getScreenName = this.getScreenName.bind(this);
		this.state={
			currentCode : 0,
			currentScreenName : "sin usuario",
			currentAverageStudent : 0,
			currentAverageCourse: 0,
		};
	}

	//devuelve todos los tweets de la clase, es decir, los que tienen #WebDev @Uniandes
	darTweets(){
		Meteor.call('darTweets',(err,res) => {
            if(err) throw err;
            console.log(">> datos de los Tweets: ");
            console.log(res);
        }); 
	}

	//devuelve los ultimos 30 tweets de un usuario por SCREEN_NAME i.e. @SneiderVG
	//nota: no se requiere el simbolo '@'
	getTweetsStudent(screenname){
		Meteor.call('darTweetsStudent',screenname,(err,res) => {
            if(err) throw err;
            console.log(">> datos de los Tweets: ");
            console.log(res);
        }); 
	}

	//busca el screen_name de un estudiante dado el codigo
	getScreenName(code){
		var snp = "no hay estudiante con ese codigo"; 
		if(this.props.students.length>0){
			this.props.students.map((s)=>
				{
					if(s.codigo == code){
						 snp = s.twitteruser;
					}
				});
			//console.log(snp);
			return snp; 
		}
		else{console.log("no hay estudiantes en el props");}
	} 

	//se obtiene los puntos de un estudiante y se modifica el dialEstudiante con estos puntos obtenidos.
	getPointsStudent(code){ 
		if(this.props.students.length>0){
			this.props.students.map((s)=>
				{
					if(s.codigo == code){
						 console.log(s.notas);
						 var sum = s.notas.reduce((a, b)=>{ return a + b; });
						 console.log(">>>suma"+sum);
						 $('.dialEstudiante').val(sum).trigger('change');
					}
				});
		}
		else{console.log("no hay estudiantes en el props");}
	}

	//se obtienen los puntos promedios de los estudiantes y se muestra en el DialAverageCourse
	getAveragePointsCourse(){
		var totalP = 0; 

		if(this.props.students.length>0){
			this.props.students.map((s)=>
				{
					totalP += s.notas.reduce((a, b)=>{ return a + b; });
				});
		}
		else{console.log("no hay estudiantes en el props");}

		if(totalP>0){
			var prom = totalP/this.props.students.length;
			$('.dialPromedio').val(prom).trigger('change');
			console.log(prom);
		}
	}

	//manejo los eventos del input del search by CODE
	handleSearch(event) {
		event.preventDefault();
		const code = ReactDOM.findDOMNode(this.refs.code).value;
	    var screenname = this.getScreenName(code);
		
		this.setState({ 
      		currentCode: code,
      		currentScreenName : screenname,
      	});

      	console.log(">>>Tweets del estudiante: "+screenname+ " con codigo: "+code);
      	this.getTweetsStudent(screenname);
      	this.getPointsStudent(code);
      	this.getAveragePointsCourse();
	}

dibujarNotas(){
	
	let students = this.props.students;
	// console.log("dibujando notas",students);


	svg = d3.select("#svg");
	svg.selectAll("*").remove();
	console.log("svg",svg);
	margin = {top: 20, right: 80, bottom: 30, left: 50},
	width = svg.attr("width") - margin.left - margin.right,
	height = svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var parseTime = d3.timeParse("%Y%m%d");

	var x = d3.scaleLinear().range([0, width])
	y = d3.scaleLinear().range([height, 0]),
	z = d3.scaleOrdinal(d3.schemeCategory10);

	var line = d3.line()
	//.curve(d3.curveBasis)
	.x(function(d, index) { return x(index); })
	.y(function(d) { return y(d); });


	x.domain([
		d3.min(students, function(c) { return d3.min(c.notas); }),
		d3.max(students, function(c) { return d3.max(c.notas, function(d, index) { return index; }); })
		]);

	y.domain([
		d3.min(students, function(c) { return d3.min(c.notas); }),
		d3.max(students, function(c) { return d3.max(c.notas, function(d) { return d; }); })
		]);

	z.domain(students.map(function(c) { return c.id; }));

		//atributos en el eje X  
		g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.append("text")
		.attr("transform", "rotate(0)")
		.attr("y", 20)
		.attr("x", width)
		.attr("dy", "0.71em")
		.attr("fill", "#000")
		.text("Day of class");

		//atributos en el eje Y  
		g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -40)
		.attr("x", 0)
		.attr("dy", "0.71em")
		.attr("fill", "#000")
		.text("Grade");

		var student = g.selectAll(".student")
		.data(students)
		.enter().append("g")
		.attr("class", "student");


		//se agregan los valores de cada linea
		student.append("path")
		.attr("class", "line")
		.attr("d", function(d) {return line(d.notas); })
		.style("stroke", function(d, index) {  return z(index); });

		// Aqui cargamos el nombre y estilo de cada linea
		// student.append("text")
		// .datum(function(d) {  return {id: "@"+d.twitteruser}; })
		// .attr("transform", "rotate(0)")
		// .attr("x", 3)
		// .attr("dy", "0.35em")
		// .style("font", "10px sans-serif")
		// .text(function(d) { return d.id; });
	}

/**
* Se encarga de llevar a la pantalla de calificador, en el caso de que sea el usuario deseado
* el que se ha logueado.
**/
cargarCalificador(){
	FlowRouter.go("/calificador");
}

 componentDidMount() {
    $(".dialPromedio").knob({
    	'width':150,
    	'heigth':100,
    	'fgColor':'#66CC66',
    	'min':0,
    	'max':50,
    	'readOnly':true,
    	'angleOffset': -125,
		'angleArc':250,
	}); 

    $(".dialEstudiante").knob({
    	'width':150,
    	'heigth':100,
  		'fgColor':'#ff0000',
  		'min':0,
    	'max':50,
    	'readOnly':true,
    	'angleOffset': -125,
		'angleArc':250,
    }); 
    this.getAveragePointsCourse();
  }

// <div className="container">
// 		<div id="visualitationDiv" className="row">
// 		{this.props.students.map(
// 			(student)=>{
// 				return (<div className="col" key={student.twitteruser}>
// 					{student.twitteruser}
// 					</div>);
// 			})}
// 		</div>
// 		</div>
render(){
	if(this.props.currentUser && this.props.currentUser.username==="mini-dictador")
		this.cargarCalificador();
	if(this.props.students.length>0)
		this.dibujarNotas();
	return(

		//div inicial
		<div className="proof">
		<center>
		<div >
		<h1 className="whiteT">TweetGrades</h1>
		<h5 className="whiteT">WebDev ~ Uniandes</h5>
		<button type="button" onClick={this.getScreenName}>Tweets!</button>
		<div className="row">
		<div className="col"></div>
		<div className="col-2">
			<form onSubmit={this.handleSearch.bind(this)} >
				<input type="number" className="form-control" ref="code" placeholder="Enter your code and press Enter!"/>
			</form>	
		</div>
		<div className="col"></div>
		</div>
		<br/>
		<div className="row">
			<div className="col"></div>
			<div className="col-auto">
				<h6>Course average</h6>
				<input type="text" defaultValue="0" className="dialPromedio"/>
			</div>
			<div className="col-1"></div>
			<div className="col-auto">
				<h6>Your points</h6>
				<input type="text" defaultValue="0" className="dialEstudiante"/>
			</div>
			<div className="col"></div>
		</div>

		
		<div className="row">
		<div className="col-1"></div>
		<svg className="col card"
			id ="svg"
			width="1280" 
			height="500" 
			ref = {this.svg}
		></svg>
		<div className="col-1"></div>
		</div>	
		
		</div>
		</center>
		<br/><br/><br/><br/>
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

})(App);
