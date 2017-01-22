import React from 'react';
import Children from 'react';
import Form from "react-jsonschema-form";
var axios = require('axios');
var store = require('../Stores/stores.js')
var AppDispatcher = require('../Dispatcher/AppDispatcher.js')
var rolForm = require('../Forms/rol_form.js')

var namespace = '/test';
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

var isEmpty = function(obj) {
    var p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
};

var rol = React.createClass({
	getInitialState: function () {
  	return {
  		schema:rolForm,
  		options:[],
  		basic_info: store.getBasicInfo(),
  		//refill:{"listOfStrings":this.props.location.rol},
  		formData: store.getRol(),
  		prefill: {}
  	}},
	contextTypes: {
		router:React.PropTypes.object.isRequired
	},
	onSubmit(form_data) {
		AppDispatcher.handleAction({
        actionType: "SET_ROL",
        data: form_data.formData
      })
		this.context.router.push ({
				pathname: 'programRanking/'
				
	})
	},
	componentWillMount: function() {
		console.log(socket)
		var basic_info = store.getBasicInfo()
		console.log(basic_info)

		//axios.post('/get_rol_schema', basic_info).
	  	socket.emit('get rol schema', {data: basic_info});
      	socket.on('rol_schema', function(value){
      			console.log(value)
				var mySchema = this.state.schema
				mySchema.properties.listOfStrings.items.enum = value.data
				this.setState({
					schema: mySchema,
					prefill: {"listOfStrings":[
					value.data[0], 
					value.data[1],
					value.data[2]
					]}
				})}.bind(this))

	},
	render() {
		var rolData = store.getRol()
		var formData = isEmpty(rolData) ? this.state.prefill : store.getRol();
	return (
		<div className="col-md-6 col-md-offset-3 height:'400px'">
			<br/><br/><br/>
    		<div>Now let's prepare your rank order list. 
    		The higher up a program, higher is your preference for it. 
    		Select programs from the drop down menu. 
    		You can add more programs by clicking on the plus button.
    		Finally, The arrow keys allow you to move a program up or down. 
    		<br/><br/>
    		</div>
    		<Form schema={this.state.schema}
    		onSubmit={this.onSubmit}
    		formData={formData}/>
    	</div>

    	)
  }
});

module.exports=rol;