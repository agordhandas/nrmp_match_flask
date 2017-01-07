import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
//import schema from './form.js';

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
      		<div className="col-md-6 col-md-offset-3">
          <h1> Residency Match Simulator </h1>
          <p>Every year, thousands of medical students and recently graduated doctors 
          apply for residency spots across the country. The match process, called the 
          National Residency Match Program (NRMP) involves residency aspirants applying to
          numerous programs, and receiving invitations to interview at some or all of them.
          Following the interviews, aspirants submit a Rank Order List (ROL), comprising of 
          their preferred residency programs, in order. Simulataneously, programs too rank the 
          candidates they interviewed throughout the season. An algorithm, a variant of the famous 
          Galey-Sharp theorem then tries to match up each applicant to a program.</p>
          <p>Here's your chance to run a simulation of the match algorithm. You will be asked to 
          pick a specialty, submit a rank order list and an estimate of where you think each program you 
          rank might rank you. The computer will take over from there...</p>
          <hr/>
            
            <p> To start off, pick a nickname for yourself and a specialty </p>
      			 <Form schema={this.state.schema}
    			   onSubmit={this.onSubmit}
                 />
           
      		</div>
      	</div>
    	)
  }
});

module.exports=Home;