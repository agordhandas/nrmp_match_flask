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
  		//refill:{"listOfStrings":this.props.location.rol},
  		prefill:{}
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
					prefill: {"listOfStrings":[
					value.data.properties.listOfStrings.items.enum[0], 
					value.data.properties.listOfStrings.items.enum[1],
					value.data.properties.listOfStrings.items.enum[2]
					]}
				})}.bind(this))

	},
	render() {
	//console.log(this.state.refill['listOfStrings']==undefined)
	return (
		<div className="col-md-6 col-md-offset-3 height:'400px'">
			<br/><br/><br/>
    		<div>Now let's prepare your rank order list. 
    		The higher up a program, higher is your preference for it. 
    		Select programs from the drop down menu. 
    		You can add more programs by clicking on the plus button.
    		Finally, The arrow keys allow you to move a program up or down. 
    		<br/><br/>
    		</div>
    		<Form schema={this.state.schema}
    		onSubmit={this.onSubmit}
    		formData={this.state.prefill}/>
    	</div>

    	)
  }
});

module.exports=rol;