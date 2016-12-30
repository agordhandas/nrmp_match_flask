var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Home = require('../js/Home.js');
var Main = require('../js/main.js');
var rol = require ('../js/rol.js');
var programRanking = require ('../js/programRanking.js')

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='rol' component={rol}/>
      <Route path='programRanking' component={programRanking}/>
    </Route>
  </Router>
);

module.exports = routes;
