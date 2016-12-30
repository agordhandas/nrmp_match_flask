import React from 'react';
import Children from 'react';
import Form from "react-jsonschema-form";
import schema from './rol_form.js';
var axios = require('axios');

var rol = React.createClass({
	getInitialState: function () {
  	return {
  		schema:{}
  	}},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	onSubmit(form_data) {
		axios.post('post_rol', 
			form_data.formData.listOfStrings);
		this.context.router.push ({
				pathname: 'programRanking/',
				query:{
					rol:form_data.formData.listOfStrings
				}
	})
	},
	componentWillMount: function() {
		axios.get('/get_rol_schema').
			then(function(value){this.setState({schema:value.data})}.bind(this))
		
	},

	render() {
    return (

    	<div className="jumbotron col-sm-12 text-center">
    	<div>Prepare Your Rank Order List Here. Click the + sign to begin.</div>
    	<Form schema={this.state.schema}
    	onSubmit={this.onSubmit}/>
    	</div>
    	)
  }
});

module.exports=rol;