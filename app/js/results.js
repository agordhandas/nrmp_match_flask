import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
import JsonTable from "react-json-table"

const columns = [
    {key:'program', label:'Program'},
    {key: 'chances', label: 'Chances'}]

var results = React.createClass({
	getInitialState: function () {
    return {
      match:[{'program':'processing', 'chances':'This may take a minute to load...'}]
    }},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	componentWillMount: function (){
		axios.post ('get_match_results', this.props.location.state)
		.then(function(value){this.setState({
      match:value.data
    })}.bind(this));
	},
  	render() {
      console.log (this.state.match)
    	return (
      	<div>
      		<div className="jumbotron col-sm-12 text-center">
      		<div><JsonTable rows={this.state.match} columns={columns} /></div>	
      		</div>
      	</div>
    	)
  }
});

module.exports=results;