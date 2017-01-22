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
      counter: 0,
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
	},

  componentDidUpdate: function(){
    socket.on('counter', function(value){
        console.log(value.data)
      })
  },

  	render() {

      socket.on('match_result', function(value){
        console.log(value)
        this.setState({
      match:value.data
    })}.bind(this));
    	return (
      	<div>
      		<div className="col-md-6 col-md-offset-3 height:'400px'">
      		<div><JsonTable rows={this.state.match} columns={columns} /></div>	
      		</div>
      	</div>
    	)
  }
});

module.exports=results;