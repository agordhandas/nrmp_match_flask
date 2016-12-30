import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";

var results = React.createClass({
	getInitialState: function () {
    return {
      match:''
    }},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	componentWillMount: function (){
		axios.get ('get_match_results').then(function(value){this.setState({match:value.data})}.bind(this));
	},
  	render() {
  		console.log(this.state.match)
    	return (
      	<div>
      		<div className="jumbotron col-sm-6 text-center">
      		<div>{this.state.match}</div>	
      		</div>
      	</div>
    	)
  }
});

module.exports=results;