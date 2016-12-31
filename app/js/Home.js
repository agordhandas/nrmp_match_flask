import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
//import schema from './form.js';

const home_form = {
  "title": "some description about match",
  "description": "Let's get started",
  "type": "object",
  "required": [
  ],
  "properties": {
    "alias": {
      "type": "string",
      "title": "Pick an alias"
    },
    "specialty": {
      "type": "string",
      "title": "What's your specialty?"
    }
  }
};

var Home = React.createClass({
  getInitialState: function () {
    return {
      basic_info: {"alias": "yoyo","specialty": "honey"},
      schema:{}
    }},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
  handleUpdateUser: function(e){
    this.setState ({
      username : e.target.value
    })

  },
  componentWillMount: function() {
    axios.get('/get_basic_info_schema').
      then(function(value){this.setState({schema:value.data})}.bind(this))
  },
	onSubmit: function (form_data) {
    
    this.setState({basic_info: form_data.formData})
		this.context.router.push({
      pathname:'rol/', 
      state:{
          basic_info:form_data.formData
        }})
	},
  render() {
    	return (
      	<div>
      		<div className="jumbotron col-sm-6 text-center">
      			<Form schema={this.state.schema}
    			onSubmit={this.onSubmit}/>
      		</div>
      	</div>
    	)
  }
});

module.exports=Home;