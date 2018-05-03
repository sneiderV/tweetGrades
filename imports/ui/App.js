
import React, { Component } from 'react';

export default class App extends Component{

	render(){
		return(
			
		//div inicial
		<div >
			<nav class="navbar navbar-expand-lg navbar-light bg-light">
			  <a class="navbar-brand" href="#">TweetGrades</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			  </button>

			  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
			    <ul class="navbar-nav mr-auto mt-2 mt-lg-0 content-end">
			      <li class="nav-item">
			        <a class="nav-link disabled" href="#">Tweets</a>
			      </li>
			      <li class="nav-item">
			        <a class="nav-link disabled" href="#">Participation</a>
			      </li>
			      <li class="nav-item">
			        <a class="nav-link disabled" href="#">Teacher Assistant</a>
			      </li>
			    </ul>
			  </div>
			</nav>

			<center>
				<div>
					<h1>TweetGrades</h1>
					<buttom></buttom>
				</div>
				<h5>WebDev ~ Uniandes</h5>
				<input type="number" name="code" placeholder="Enter your code"/>
				<div id="visualitationDiv">
					
				</div>
			</center>
		</div>
		);
	}

}