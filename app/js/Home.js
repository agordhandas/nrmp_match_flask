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

	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	onSubmit: function (form_data) {
		axios.post('post_basic_info', form_data.formData);
		this.context.router.push({pathname:'rol/'})
	},

  	render() {
    	return (
      	<div>
      		<div className="jumbotron col-sm-6 text-center">
      			<Form schema={home_form}
    			onSubmit={this.onSubmit}/>
      		</div>
      	</div>
    	)
  }
});

module.exports=Home;