import Home from './Home';
import React from 'react';
import ReactDOM from 'react-dom';
import Form from "react-jsonschema-form";
//import schema from './form.js';
import SortableList from './sortable.js';
var routes = require('../config/routes');

//console.log ({schema})
ReactDOM.render(routes, document.getElementById('reactEntry'));

var data = {
  items: [
    "Gold",
    "Crimson",
    "Hotpink",
    "Blueviolet",
    "Cornflowerblue"
  ]
};

//ReactDOM.render(
  //  <SortableList data={data} />,
    //document.getElementById('second')
//);

//ReactDOM.render(<Form schema={schema}/>, document.getElementById("second"));
