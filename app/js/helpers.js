var axios = require('axios');

function getUser(){
  return axios.get('/get_value');
}

function getRolSchema(){
  return axios.get('/get_rol_schema')
}

var helpers = {
  getGithubInfo: function(username){
    return getUser().then(function(value){return value.data})
    /*return axios.all([getRepos(username), getUserInfo(username)])
      .then(function(arr){
        console.log (arr[0].data)
        return {
          repos: arr[0].data,
          bio: arr[1].data
        }
      })*/
  }
}

module.exports=helpers;