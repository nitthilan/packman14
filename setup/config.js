

module.exports = {
  development:{
  	root:require('path').normalize(__dirname + '/..')+"/",
    static_path:require('path').normalize(__dirname + '/../ui')+"/",
    //temp_folder_path:require('path').normalize(__dirname + '/../../temp')+"/",
    host:'localhost',
    port:'3000',
  }
}