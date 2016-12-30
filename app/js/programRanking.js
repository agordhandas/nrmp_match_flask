import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
//import schema from './form.js';

var programRanking = React.createClass({
  contextTypes: {
    router:React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      schema:{}
    }},

	componentWillMount: function () {
  	var query=this.props.location.query;
  	axios.post('get_program_schema', query).
    then(function(value){this.setState({schema:value.data})}.bind(this));
  },
  onSubmit:function(form_data){
    //console.log (form_data.formData)
    axios.post('post_program_rankings', form_data.formData);
    this.context.router.push ({pathname:'results'})
  },
	render() {
    return (

      <div className="jumbotron col-sm-12 text-center">
      <div>WHERE</div>
      <Form schema={this.state.schema}
      onSubmit={this.onSubmit}/>
      </div>
      )
  }
});



module.exports=programRanking;
