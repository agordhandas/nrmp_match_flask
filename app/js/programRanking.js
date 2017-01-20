import React from 'react';
import Children from 'react';
var axios = require('axios');
var helpers = require ('./helpers.js');
import Form from "react-jsonschema-form";
var store = require('../Stores/stores.js')
var AppDispatcher = require('../Dispatcher/AppDispatcher.js')
//import schema from './form.js';

const schema_shell = {"type": "object", "properties":{}};
const ui_shell = {"ui:order": []}

var programRanking = React.createClass({
  contextTypes: {
    router:React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      schema:{},
      uischema:{},
      rol: store.getRol(),
      basic_info: store.getBasicInfo(),
      formData: store.getProgramRankings()
    }},

	componentWillMount: function () {
    var rol = this.state.rol.listOfStrings
    schema_shell.properties = rol.reduce(function(result, item) {result[item] = {"title":item, type:"integer"}; return result}, {});
    ui_shell["ui:order"] = rol
    this.setState({
      schema: schema_shell,
      uischema: ui_shell
    })
  },
  onSubmit:function(form_data){
    AppDispatcher.handleAction({
        actionType: "SET_PROGRAM_RANKINGS",
        data: form_data.formData
      })
    this.context.router.push ({pathname:'results'
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
      uiSchema={this.state.uischema}
      formData={this.state.formData}
      />
      </div>
      )
  }
});



module.exports=programRanking;
