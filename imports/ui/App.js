
import React, { Component } from 'react';
import "./css/app.css"
import { withTracker } from "meteor/react-meteor-data";
import * as d3 from "d3";
import knob from 'jquery-knob';
import $ from 'jquery';
import ReactDOM from 'react-dom';
//DB y metodos
import { Students } from "../api/students.js";
//Componentes
import AccountsUI from "./AccountsUI.js";
import LineChart from "./LineChart.js";

class App extends Component{
	constructor(props){
		super(props);
		// this.componentDidMount = this.componentDidMount.bind(this);

		this.darTweets = this.darTweets.bind(this);
		this.getTweetsStudent = this.getTweetsStudent.bind(this);
		this.getScreenName = this.getScreenName.bind(this);
		this.state={
			currentCode : 0,
			currentScreenName : "sin usuario",
			currentAverageStudent : 0,
			currentAverageCourse: 0,
			tweetsStudent :[],
			update:false
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
            const tweets = (
            	<div id="containerTweets" className="card-columns">
            	{ 	res.map((t)=>{
            			return (
            				<div id={t.id_str} className="card" style={{width: 15+'rem'}} >
            					<div className="card-body">
            						<div className="media">
	            						<img src={t.user.profile_image_url} alt="profile image" className="rounded-circle"/>
	            						<div className="media-body">
		            						<h5 className="card-title">{t.user.name}</h5>
		            						<h6 className="card-subtitle mb-2 text-muted">@{t.user.screen_name}</h6>
	            						</div>
            						</div>
            						<p className="card-text">{t.text}</p>
            						<h6 className="card-subtitle mb-2 text-muted">{t.created_at}</h6>
            						<a href={t.entities.urls.map((u)=>{return u.expanded_url})}>
            							see your tweet
            							<img style={{width: 30 , heigth:20 }} src="https://vignette.wikia.nocookie.net/es.starwars/images/9/92/Twitter_Icon.png/revision/latest?cb=20151201204526" alt="profile image" className="rounded-circle"/>
            						</a>
            					</div>
							
            				</div>
            			);
            		})
            	}
            	</div>
            );
            ReactDOM.render(tweets, document.getElementById('rootTWEETS'));
            console.log(">> datos de los Tweets: ");
            console.log(res);
            this.setState({ 
      		tweetsStudent : res,
      		});
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

/**
* Se encarga de llevar a la pantalla de calificador, en el caso de que sea el usuario deseado
* el que se ha logueado.
**/
cargarCalificador(){
	FlowRouter.go("/calificador/");
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

// <blockquote className="twitter-tweet">
// 		<a href="https://twitter.com/SneiderVG/status/993350996242911233" data-datetime="2012-12-03T18:51:11+00:00"></a>
// </blockquote>

// <button type="button" onClick={this.getScreenName}>Tweets!</button>
verificarUsuario(){
	return(
		this.props.currentUser.username==="mini-dictador" ||
		this.props.currentUser.username==="dictador" ||
		this.props.currentUser.username==="coima"
		)
}

render(){
	if(this.props.currentUser && this.verificarUsuario())
	{
		this.cargarCalificador();
		return <div></div>;
	}
	return(
		//div inicial
		<div className="proof">
		<center>
		<div >

		<div>
			<div className="row">
				<div className="col-6 divHome" >
				<div className="row">
					<div className="col">
						<br/>
						<img style={{width: 300 , heigth:450 }} src="https://store-images.s-microsoft.com/image/apps.54178.13548944327891380.9678aa3c-94b5-4326-8f29-886220160bf7.d926c117-cc96-450e-bc06-b3609d08dc24?w=180&h=180&q=60" alt="john alexis guerra" className="rounded-circle"/>
						<h1 className="blueT">TweetGrades</h1>
					</div>
				</div>
				</div>

				<div className="col-6 homeDescription">
					
					<h5 >Web Development ~ Uniandes</h5>
					<br/>
				    <p >This course offers the fundamentals for understanding modern web development. 
				    	At the end of this course students should be able to build modern web applications 
				    	using cutting edge technologies.</p> 
				    <span>Teacher:  &nbsp; 
				    <a href="http://johnguerra.co/">
				    	<img style={{width: 40 , heigth:30 }} src="https://avatars1.githubusercontent.com/u/1216843?s=460&v=4" alt="john alexis guerra" className="rounded-circle"/>
				    	 &nbsp; Jhon Alexis Guerra Gómez
				    </a>
				    </span> <br/><br/>
				    <p >With <strong>TweetGrades</strong> the students can view his current grade about Tweets participation. 
				    	you just need to put your code in the space below.</p>
				</div>
			</div>
		</div>


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
		<LineChart update={this.state.update} students={this.props.students}/>
		<div className="col-1"></div>
		</div>	

		<br/>
		<div className="divTweets">
			<h1 className="whiteT">These are your course tweets</h1>
			<div id="rootTWEETS" className="row divTweets"> 
				<h4 className="whiteT">Put your code above and turn back here to see.</h4>
			</div>
		</div>
		

		
		</div>
		</center>
		
		</div>
		);
}

componentDidUpdate(prevProps, prevState) {
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
