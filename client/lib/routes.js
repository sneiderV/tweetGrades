import {mount} from 'react-mounter';

import App from "../../imports/ui/App.js";
import Calificador from "../../imports/ui/Calificador.js";

FlowRouter.route("/",{
	action: function(params, queryParams) {
		mount(App)
	}
})

FlowRouter.route("/calificador",{
	action: function(params, queryParams) {
		mount(Calificador)
	}
})