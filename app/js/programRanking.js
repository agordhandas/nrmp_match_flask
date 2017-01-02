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
      schema:{},
      uischema:{},
      rol: this.props.location.state.rol,
      basic_info: this.props.location.state.basic_info
    }},

	componentWillMount: function () {
  	axios.post('get_program_schema', this.state.rol).
    then(function(value){this.setState({
      schema:value.data['schema'],
      uischema:value.data['ui']
    })}.bind(this));
  },
  onSubmit:function(form_data){
    //console.log (form_data.formData)
    //axios.post('post_program_rankings', form_data.formData);
    this.context.router.push ({pathname:'results',
    state: {
      rol: this.state.rol, 
      program_rankings:form_data.formData,
      basic_info: this.state.basic_info
    }
  })
  },
	render() {
    return (

      <div className="col-md-6 col-md-offset-3 height:'400px'">
      <br/><br/><br/><br/>
      <div>How do you think will each of these programs rank you?</div>
      <br/><br/>
      <Form schema={this.state.schema}
      onSubmit={this.onSubmit}
      uiSchema={this.state.uischema}/>
      </div>
      )
  }
});



module.exports=programRanking;
