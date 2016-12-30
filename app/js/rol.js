import React from 'react';
import Children from 'react';
import Form from "react-jsonschema-form";
import schema from './rol_form.js';
var axios = require('axios');

var rol = React.createClass({
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	onSubmit(form_data) {
		axios.post('get_rol', 
			form_data.formData.listOfStrings);
		this.context.router.push ({
				pathname: 'programRanking/',
				query:{
					rol:form_data.formData.listOfStrings
				}
	})
	},
	render() {
    return (
    	<div className="jumbotron col-sm-12 text-center">
    	<Form schema={schema}
    	onSubmit={this.onSubmit}/>
    	</div>
    	)
  }
});

module.exports=rol;