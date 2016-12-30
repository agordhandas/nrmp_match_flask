var axios = require('axios');

function getUser(){
  return axios.get('/get_value');
}

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username);
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