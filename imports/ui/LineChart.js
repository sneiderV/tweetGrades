import React, { Component } from 'react';
import * as d3 from "d3";


export default class LineChart extends Component {
	constructor(props){
		super(props);
		this.svg = React.createRef();
		//fechas de clases
		this.fechas = ["01/26","01/29","02/02","02/05","02/09","02/12","02/19","02/23","02/26","03/02","03/12","03/16","03/23","04/06","04/09","04/13","04/16","04/20","04/23","04/27","04/30","05/04","05/07","05/11","05/14","05/18"]

	}

	componentDidUpdate(){
		this.dibujarNotas();
	}
	dibujarNotas(){

		let students = this.props.students;
		if(students.length<=0){
			return;
		}


		svg = d3.select("#svg");
		svg.selectAll("*").remove();
		margin = {top: 20, right: 80, bottom: 30, left: 50},
		width = svg.attr("width") - margin.left - margin.right,
		height = svg.attr("height") - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var parseTime = d3.timeParse("%Y%m%d");

		var x = d3.scaleLinear().range([0, width])
		y = d3.scaleLinear().range([height, 0]),
		z = d3.scaleOrdinal(d3.schemeCategory10);

		let fechas = this.fechas;
		var line = d3.line()
			//.curve(d3.curveBasis)
			.x(function(d, index) { return x(index); })
			.y(function(d) { return y(d); });

			x.domain([
				d3.min(this.fechas, function(c,i) { return i; }),
				d3.max(this.fechas, function(c,i) { return i; })
				// d3.min(students, function(c) { return d3.min(c.notas, function(d, index) { return index; }); }),
				// d3.max(students, function(c) { return d3.max(c.notas, function(d, index) { return index; }); })
				]);

			y.domain([
				d3.min(students, function(c) { return d3.min(c.notas); }),
				d3.max(students, function(c) { return d3.max(c.notas); })
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
		.attr("id", function(d) {		return "line"+d.codigo;})
		.attr("d", function(d) {return line(d.notas); })
		.style("stroke", function(d, index) {  return z(index); });

		if(this.props.currentCode >0)
			this.seleccionarCodigo(this.props.currentCode);
	}

	seleccionarCodigo(codigo){
		// Se opacan todos
		d3.selectAll("path")
			.style("opacity", 0.7)
	    .style("stroke", "#888");

	  // El seleccionado
	  d3.selectAll("#line"+codigo)
	  	.transition()
      .duration(2000)
      .attr("r", 10)
      .style("opacity", 1.0)
      .style("stroke", "red")
      .style("stroke-width", "8.5px");
	}

	render() {
		return (
			<svg className="col card"
			id ="svg"
			width="1280" 
			height="500" 
			></svg>
			);
	}
}
