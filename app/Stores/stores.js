var AppDispatcher = require('../Dispatcher/AppDispatcher');

var EventEmitter = require('events').EventEmitter;

var namespace = '/test';
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);



var _store = {
  basic_info: {},
  programRankings : {},
  rol: {},
  socket : socket
};


var store =  {
  addChangeListener: function(cb){
    this.on('change', cb);
  },
  removeChangeListener: function(cb){
    this.removeListener('change', cb);
  },
  getBasicInfo: function(){
    return _store.basic_info;
  },
  getProgramRankings: function(){
    return _store.programRankings
  },
  getRol: function(){
    return _store.rol
  },
  getSocket: function(){
    return _store.socket
  }
};

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case "SET_BASIC_INFO":
      _store.basic_info = action.data;
      break;

    case "SET_PROGRAM_RANKINGS":
      _store.programRankings = action.data;
      break;
    case "SET_ROL":
      _store.rol = action.data;
    default:
      return true;
  }
});

module.exports = store;