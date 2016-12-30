import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
//import schema from './form.js';

var Hello = React.createClass({
  getInitialState: function(){
  	return{myname:''
  }
  },
  render() {
  	helpers.getGithubInfo('agordhandas').then(function(value){
  		this.setState({
  			myname:value
  		})
  	}.bind(this))
    return (
      <div>
        <div className='col-sm-8 col-sm-offset-2 jumbotron col-sm-12 text-center'>
         <h1>{this.state.myname} </h1>
        </div>
      </div>
    	)
  }
});



module.exports=Hello;
