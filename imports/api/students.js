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
  		var Twit = require('twit');

	    var T = new Twit({
	        consumer_key:         'GTi2PxIHdvA8OjneUlZKf7XXx', // API key
	        consumer_secret:      'qC0fVvdNiQ8P18Qxe3G176gZ5M7ERykq0FwSVPvpMBB5wTtDUb', // API secret
	        access_token:         '889371522648993792-vnmSDq4hyVQDY4aMUGkEzrO4fKOXOLB', 
	        access_token_secret:  'ILhpnYZ85aJjNeJ3a8N2DFo8Beo42QqYNnmUHqCgMfSS9'
	    });

	    //esto es algo raro ????????
	    const getTweets = Meteor.wrapAsync(T.get, T);
	    //  search twitter for all tweets containing the word '#WebDev @Uniandes' /// since:2011-11-11
	    try {
	      return getTweets('search/tweets', { q: '#WebDev @Uniandes', count: 100 });
    	} 
    	catch (error) { throw new Meteor.Error(error.name, error.message);}
  	}

  }); // final of Meteor Methods

}//final of if Meteor.isServer