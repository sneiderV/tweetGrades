import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";


import '../imports/startup/accounts-config.js';
import './main.html';

import AccountsUI from "../imports/ui/AccountsUI.js"
import App from "../imports/ui/App.js"


Meteor.startup(()=>{
	{
    // render(<AccountsUI />, document.getElementById("login"));
		render(<App />,document.getElementById("react-root"));	
	}
});
