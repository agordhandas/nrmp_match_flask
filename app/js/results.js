import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
import JsonTable from "react-json-table"
var store = require('../Stores/stores.js')
var AppDispatcher = require('../Dispatcher/AppDispatcher.js')

var namespace = '/test';
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

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
    var input_data = {
      'rol': store.getRol().listOfStrings,
      'program_rankings': store.getProgramRankings(),
      'basic_info': store.getBasicInfo()
    };
		//axios.post ('get_match_results', input_data)
    socket.emit('get_match_results', {'data': input_data})
    socket.on('match_result', function(value){
      this.setState({
      match:value.data
    })}.bind(this));
	},
  	render() {
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