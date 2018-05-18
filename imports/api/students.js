import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

//manejo de collection en Mongo
export const Students = new Mongo.Collection("students");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('students', function studentsPublication() {
    return Students.find();
  });

  Meteor.methods({

  	'darTweets'(){
  		console.log(process.env);
  		var Twit = require('twit');

	    var T = new Twit({
	        consumer_key:         process.env.TW_CONSUMER_KEY, // API key
	        consumer_secret:      process.env.TW_CONSUMER_SECRET, // API secret
	        access_token:         process.env.TW_ACCESS_TOKEN, 
	        access_token_secret:  process.env.TW_ACCESS_SECRET
	    });

	    //esto es algo raro ????????
	    const getTweets = Meteor.wrapAsync(T.get, T);
	    //  search twitter for all tweets containing the word '#WebDev @Uniandes' /// since:2011-11-11
	    try {
	      return getTweets('search/tweets', { q: '#WebDev @Uniandes', count: 100 });
    	} 
    	catch (error) { throw new Meteor.Error(error.name, error.message);}
  	},

  	'darTweetsStudent'(screenname){
  		var Twit = require('twit');

	    var T = new Twit({
	        consumer_key:         'GTi2PxIHdvA8OjneUlZKf7XXx', // API key
	        consumer_secret:      'qC0fVvdNiQ8P18Qxe3G176gZ5M7ERykq0FwSVPvpMBB5wTtDUb', // API secret
	        access_token:         '889371522648993792-vnmSDq4hyVQDY4aMUGkEzrO4fKOXOLB', 
	        access_token_secret:  'ILhpnYZ85aJjNeJ3a8N2DFo8Beo42QqYNnmUHqCgMfSS9'
	    });

	    const getTweets = Meteor.wrapAsync(T.get, T);
	    //  search twitter for all tweets containing the word '#WebDev @Uniandes' /// since:2011-11-11
	    try {
	      return getTweets('statuses/user_timeline', { screen_name: screenname, count: 20 });
    	} 
    	catch (error) { throw new Meteor.Error(error.name, error.message);}
  	},

  	"calificarTweet"(twitteruser, puntos, idTweet, posClase){
  		check(twitteruser, String);
			check(idTweet, String);
			check(puntos,Number);
			check(posClase,Number);
			// let notasp = "notas.$."+posClase;
			//Agrega el idtweet
			Students.update(
				{
					twitteruser : twitteruser
				}, 
				{
					// $set: 
					// {
					// 	"notas.$.25":puntos
					// },
					$push: 
					{
						"idtweets": idTweet
					}
				}
				);
			//obtiene las notas
			let notas = Students.find({
				twitteruser : twitteruser
			},
			{
				notas:1,

			}).fetch()[0].notas;
			notas[posClase]=puntos;
			// Actualiza las notas
			Students.update(
				{
					twitteruser : twitteruser
				}, 
				{
					$set:
					{
						notas:notas
					}
				}
			);
			console.log("grades from " +twitteruser+" updated.")
  	}

  }); // final of Meteor Methods

}//final of if Meteor.isServer