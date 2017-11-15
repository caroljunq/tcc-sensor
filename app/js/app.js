const Repeat = require('repeat');
const  exec  = require('child-process-promise').exec;


var count = 0;
function scan() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth(); 
  let year   = date.getFullYear();
  let hour = date.getHours();
  let fileName = 'LTIA_'+year+'-'+month+'-'+day+'_'+hour+'-00';
  console.log(fileName);
  exec('ping google.com').then(console.log('terminei'));

  
}
 
scan();