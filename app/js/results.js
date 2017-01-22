import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
import JsonTable from "react-json-table"
var store = require('../Stores/stores.js')
var AppDispatcher = require('../Dispatcher/AppDispatcher.js')
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var namespace = '/test';
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);



const columns = [
    {key:'program', label:'Program'},
    {key: 'chances', label: 'Chances'}]

var results = React.createClass({
	getInitialState: function () {
    return {
      counter: 0,
      match:[]
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

  componentDidMount: function(){
    socket.on('counter', function(value){
        this.setState({
          counter: value.data
        })
      }.bind(this))
    socket.on('match_result', function(value){
        console.log(value)
        this.setState({
      match:value.data
    })}.bind(this));
  },

  	render() {
      var displayText = "Processing... Progress: " + this.state.counter/2 + '%'
    	return (
      	<div>
      		<div className="col-md-6 col-md-offset-3 height:'400px'">
      		<BootstrapTable data={this.state.match} striped hover options={ { noDataText: displayText } }>
      <TableHeaderColumn isKey dataField='program'>Program</TableHeaderColumn>
      <TableHeaderColumn dataField='chances'>Probability of Matching (%)</TableHeaderColumn>
  </BootstrapTable>
          <div>{this.state.counter}</div>
      		</div>
      	</div>
    	)
  }
});

module.exports=results;