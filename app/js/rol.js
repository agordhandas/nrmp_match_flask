import React from 'react';
import Children from 'react';
import Form from "react-jsonschema-form";
import schema from './rol_form.js';
var axios = require('axios');

var rol = React.createClass({
	getInitialState: function () {
  	return {
  		schema:{},
  		basic_info: this.props.location.state.basic_info,
  		first_three:[]
  	}},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	onSubmit(form_data) {
		axios.post('post_rol', 
			form_data.formData.listOfStrings);
		this.context.router.push ({
				pathname: 'programRanking/',
				state:{
					rol:form_data.formData.listOfStrings,
					basic_info: this.state.basic_info
				}
	})
	},
	componentWillMount: function() {
		var basic_info = this.state.basic_info
		axios.post('/get_rol_schema', basic_info).
			then(function(value){
				this.setState({
					schema:value.data,
					first_three: {"listOfStrings":[
					value.data.properties.listOfStrings.items.enum[0], 
					value.data.properties.listOfStrings.items.enum[1],
					value.data.properties.listOfStrings.items.enum[2]
					]}
				})}.bind(this))

	},
	render() {
	//console.log(formData)
	return (
		<div className="jumbotron col-sm-12 text-center">
    	<div>Prepare Your Rank Order List Here. Click the + sign to begin.</div>
    	<Form schema={this.state.schema}
    	onSubmit={this.onSubmit}
    	formData={this.state.first_three}/>
    	</div>
    	)
  }
});

module.exports=rol;