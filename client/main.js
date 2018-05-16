import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

//import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/accounts-config.js';
import './main.html';

import AccountsUI from "../imports/ui/AccountsUI.js"
import App from "../imports/ui/App.js"


Meteor.startup(()=>{
	{
    render(<AccountsUI />, document.getElementById("login"));
		render(<App />,document.getElementById("react-root"));	
	}
});

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/
