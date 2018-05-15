
import React, { Component } from 'react';
import { Students } from "../api/students.js";
import "./css/app.css"
import { withTracker } from "meteor/react-meteor-data";
import * as d3 from "d3";

class App extends Component{
	constructor(props){
		super(props);
		this.svg = React.createRef();
		// this.componentDidMount = this.componentDidMount.bind(this);
		
	}

	componentDidMount(){
		var students = [
{"nombre":"NICOLAS ACEVEDO SANDOVAL","seccion":1,"codigo":201530726,"twitteruser":"n_acevedo11","notas":[2,1,2,-1,2,2,0,2,2,-1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"GERMAN CAMILO ANDRADE MAYORGA","seccion":1,"codigo":201511422,"twitteruser":"gcandrade10","notas":[0,2,2,2,2,2,2,2,2,-1,2,1,1,1,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN SEBASTIAN BARRAGAN JERONIMO","seccion":1,"codigo":201212774,"twitteruser":"sebas9064","notas":[2,2,2,2,2,2,2,2,1,-1,2,2,2,2,0,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"NICOLAS EDUARDO CABRERA VENEGAS","seccion":1,"codigo":201530947,"twitteruser":"NicolasCabrer","notas":[2,2,2,0,2,2,2,2,2,2,2,2,2,1,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"CAMILO ANDRES CARRILLO NIÑO","seccion":1,"codigo":201215749,"twitteruser":"CamiloC_Wk","notas":[2,2,2,2,-1,2,2,0,2,-1,1,0,1,2,-1,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"SANTIAGO CORTES FERNANDEZ","seccion":1,"codigo":201531124,"twitteruser":"SantiagoCF96","notas":[2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"DAVID FERNANDO CUBILLOS SANCHEZ","seccion":1,"codigo":201412152,"twitteruser":"notDfCubillos","notas":[2,2,1,0,0,0,-1,1,1,0,2,1,0,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"BIBIANA GAMBA SABOGAL","seccion":1,"codigo":201423538,"twitteruser":"bibigamba","notas":[2,1,2,2,2,2,2,2,2,-1,2,1,2,2,2,1,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN DIEGO GONZALEZ ARTETA","seccion":1,"codigo":201531418,"twitteruser":"juandg161","notas":[-1,2,2,2,2,2,2,2,2,2,-1,1,2,1,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"CAMILO ANDRES MONTENEGRO HERNANDEZ","seccion":1,"codigo":201531747,"twitteruser":"camontenegro11","notas":[2,2,0,2,2,2,2,2,2,2,2,1,2,-1,2,0,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"CRISTIAN CAMILO NOVOA AVELLANEDA","seccion":1,"codigo":201513389,"twitteruser":"novoa_14","notas":[1,1,2,2,0,-1,2,2,2,-1,2,2,0,1,-1,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"SERGIO ANDRES PARDO SANCHEZ","seccion":1,"codigo":201415928,"twitteruser":"Carnifis","notas":[2,1,1,2,2,2,2,2,1,-1,2,2,1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"CARLOS GABRIEL PEÑALOZA GOMEZ","seccion":1,"codigo":201531973,"twitteruser":"cpenalozag","notas":[2,2,2,2,2,2,2,2,2,-1,2,1,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN SEBASTIAN PRIETO BUSTAMANTE","seccion":1,"codigo":201426358,"twitteruser":"SebasP27","notas":[2,2,2,2,-1,2,2,2,1,1,-1,1,-1,2,2,-1,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"PAULA JULIANA RAMIREZ GONZALEZ","seccion":1,"codigo":201328023,"twitteruser":"paujrg","notas":[2,0,1,0,2,1,2,2,2,2,2,1,1,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"FREDDY ANDRES VERA HERNANDEZ","seccion":1,"codigo":201417333,"twitteruser":"FAndresVera26","notas":[2,0,2,2,2,0,2,-1,0,1,-1,2,-1,1,-1,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"CAMILO ZAMBRANO VOTTO","seccion":1,"codigo":201515438,"twitteruser":"Camilozvi","notas":[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"NICOLAS AGUILAR LEON","seccion":2,"codigo":201530741,"twitteruser":"Nicolas_Agui","notas":[2,2,2,2,2,2,2,2,1,2,-1,2,-1,2,-1,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN CAMILO BUSTAMANTE ATEHORTUA","seccion":2,"codigo":201212925,"twitteruser":"JuanBusho","notas":[2,2,1,-1,1,0,2,-1,1,-1,0,2,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN DIEGO CHAVES SANGUINO","seccion":2,"codigo":201533528,"twitteruser":"JuanDiegoChav13","notas":[2,2,1,2,2,0,0,2,0,-1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN MANUEL DOMINGUEZ OSORIO","seccion":2,"codigo":201532819,"twitteruser":"jmdominguezWebD","notas":[2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"ALEJANDRO ECHEVERRI ROMERO","seccion":2,"codigo":201532824,"twitteruser":"AEcheverriR","notas":[2,2,2,-1,2,2,1,2,2,1,-1,2,2,2,2,-1,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"ANDRES DAVID LAITON VARGAS","seccion":2,"codigo":201422317,"twitteruser":"David_Laiton","notas":[2,2,2,2,1,-1,0,2,1,2,0,2,1,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"FABIO ANDRES LOPEZ CORREDOR","seccion":2,"codigo":201423782,"twitteruser":"faanloco","notas":[2,2,1,2,2,-1,2,2,2,2,2,2,-1,2,2,0,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN MANUEL ALBERTO LOVERA LOZANO","seccion":2,"codigo":201423795,"twitteruser":"jmalovera10","notas":[2,2,2,2,2,-1,-1,-1,2,2,2,2,2,-1,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN FELIPE MENDEZ PERALTA","seccion":2,"codigo":201423877,"twitteruser":"jfmendez11","notas":[1,2,1,2,2,-1,-1,-1,1,1,2,0,1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"ANDRES FELIPE OLIVARES VARGAS","seccion":2,"codigo":201424027,"twitteruser":"af_olivares","notas":[2,1,2,2,2,2,2,1,0,2,2,2,1,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"JUAN CAMILO PINILLA RAMIREZ","seccion":2,"codigo":201533888,"twitteruser":"juancpinillar","notas":[2,2,2,0,2,2,2,0,0,2,-1,2,0,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"WILLIAM RICARDO RAVELO MENDEZ","seccion":2,"codigo":201532093,"twitteruser":"Ravelinx","notas":[2,2,2,2,2,1,2,2,2,2,2,1,2,2,1,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"RAMON ESTEBAN VEGA SALAZAR","seccion":2,"codigo":201424569,"twitteruser":"RamonVega96","notas":[2,2,2,0,2,0,2,2,1,1,2,2,0,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"ESNEIDER VELANDIA GONZALEZ","seccion":2,"codigo":201215364,"twitteruser":"SneiderVG","notas":[2,0,0,2,-1,1,2,2,2,1,2,2,1,2,2,1,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]},
{"nombre":"TOMAS FELIPE VENEGAS BERNAL","seccion":2,"codigo":201328833,"twitteruser":"TomasVenegas6","notas":[2,2,2,2,2,1,2,2,2,-1,2,2,2,2,2,2,-1,-1,-1,-1,-1,-1,-1],"idtweets":[]}
];


		svg = d3.select("#svg");
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

	darTweets(){
		Meteor.call('darTweets',(err,res) => {
            if(err) throw err;
            console.log(">> datos de los Tweets: ");
            console.log(res);
        }); 
	}

render(){
	return(

		//div inicial
		<div className="proof">
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<a className="navbar-brand" href="#">TweetGrades</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
		<ul className="navbar-nav mr-auto mt-2 mt-lg-0 content-end">
		<li className="nav-item">
		<a className="nav-link disabled" href="#">Tweets</a>
		</li>
		<li className="nav-item">
		<a className="nav-link disabled" href="#">Participation</a>
		</li>
		<li className="nav-item">
		<a className="nav-link disabled" href="#">Teacher Assistant</a>
		</li>
		</ul>
		</div>
		</nav>

		<center>
		<div >
		<h1 className="whiteT">TweetGrades</h1>
		<h5 className="whiteT">WebDev ~ Uniandes</h5>
		<button type="button" onClick={this.darTweets()}>Tweets!</button>
		<div className="row">
		<div className="col-4"></div>
		<div className="col-4">
		<input type="number" name="code" width="10" className="form-control" placeholder="Enter your code"/>
		</div>
		<div className="col-4"></div>
		</div>
		<div className="container">
		<div id="visualitationDiv" className="row">
		{this.props.students.map(
			(student)=>{
				return (<div className="col">
					{student.twitteruser}
					</div>);
			})}
		</div>
		</div>
		<div className="row">
		<div className="col-1"></div>
		<svg className="col card"
		id ="svg"
		width="1280" 
		height="500" 
		// ref = {(svg)=>this.svg=svg}
		ref = {this.svg}
		></svg>
		<div className="col-1"></div>
		</div>	
		</div>
		</center>
		<br/><br/><br/><br/><br/><br/>
		</div>
		);
}

}

export default withTracker(()=>{
	//Se suscribe a la publicación de students
	Meteor.subscribe("students");

	return {
		students: Students.find({}, {sort: {createdAt: -1}}).fetch(),
	};

})(App);
