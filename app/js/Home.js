import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
//import schema from './form.js';

var Home = React.createClass({
  render() {
    return (
      <div>
      <div className="jumbotron col-sm-12 text-center">
      <p>A brown fox jumped over a lazy river</p>  
      </div>
      </div>
    	)
  }
});

module.exports=Home;