import React from 'react';
import Children from 'react';
var helpers = require ('./helpers.js');
var store = require('../Stores/stores.js')
var AppDispatcher = require('../Dispatcher/AppDispatcher.js')
var home_form = require('../Forms/homeForm')
import Form from "react-jsonschema-form";
//import schema from './form.js';

var namespace = '/test';
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

const formData = {
  alias: "First task",
  specialty: "Pathology"
};


var Home = React.createClass({
  getInitialState: function () {
    return {
      schema: home_form,
      formData: store.getBasicInfo(),
    }},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},

  componentWillMount: function() {
    socket.emit('test_stream')
  },
  
	onSubmit: function (form_data) {
    AppDispatcher.handleAction({
      actionType: "SET_BASIC_INFO",
      data: form_data.formData
    })
		this.context.router.push({
      pathname:'rol/'
    })
	},
  render() {
      socket.on('stream', function(k){
        console.log(k)
      })
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
          Gale-Shapley algorithm then tries to match up each applicant to a program.</p>
          <p>Here's your chance to run a simulation of the match algorithm. You will be asked to 
          pick a specialty, submit a rank order list and an estimate of where you think each program you 
          rank might rank you. The computer will take over from there. The underlying data (programs participating 
          in the match for a particular specialty, average number of applicants for a specialty, average number of positions etc.) 
          is based on Match 2016, as released by NRMP.</p>
          <hr/>
            
            <p> To start off, pick a specialty </p>
      			 <Form schema={home_form}
             onSubmit={this.onSubmit}
             formData={this.state.formData}
             
             />

          <hr/>
          <p><small> By using the simulation, you understand and agree that:
          <ul>
          <li>This is just a simulation. I obviously make no implicit or explicit guarantees about the accuracy of the simulation</li>
          <li>Neither this simulation, nor I, are in any way affiliated with NRMP</li>
          <li>The simulation is based on the description of the algorithm published on the NRMP website — my interpretation may be flawed.</li>
          </ul>
          Happy Matching!</small>
          </p>  
           
      		</div>
      	</div>
    	)
  }
});

module.exports=Home;