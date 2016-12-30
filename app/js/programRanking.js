import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
//import schema from './form.js';

var programRanking = React.createClass({
	componentDidMount: function () {
  	var query=this.props.location.query;
  	console.log(query['rol'])
  },
	render() {
    return (
      <div>
        <div className='col-sm-8 col-sm-offset-2 jumbotron col-sm-12 text-center'>
         <h1>Where do you think the programs rank you? </h1>
        </div>
      </div>
    	)
  }
});



module.exports=programRanking;
