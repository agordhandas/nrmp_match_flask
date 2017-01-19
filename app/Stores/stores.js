var AppDispatcher = require('../Dispatcher/AppDispatcher');

var EventEmitter = require('events').EventEmitter;

var _store = {
  basic_info: {"alias": "yoyo","specialty": "Pathology"},
  programRankings : {},
  rol: {}
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
  }
};

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case "SET_ALIAS":
      _store.basic_info = action.data;
      break;
    case "SET_PROGRAM_RANKINGS":
      _store.programRankings = action.data;
      break;
    case "SET_ROL":
      console.log("This")
      _store.rol = action.data;
      console.log(_store.rol)
    default:
      return true;
  }
});

module.exports = store;