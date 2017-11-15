const Repeat = require('repeat');
const exec = require('child-process-promise').exec;
const request = require('request');
const fs = require('fs');

exec('ifconfig wlan1 down')
    .then(exec('iwconfig wlan1 mode monitor')
         .then(exec('ifconfig wlan1 up')));

var count = 0;

function scan() {

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth(); 
  let year   = date.getFullYear();
  let hour = date.getHours();
  let fileName = 'LTIA_'+year+'-'+month+'-'+day+'_'+hour+'-0'+ count; 
  ++count;
  exec('tshark -i wlan1 -a duration:18 -Y "wlan.fc.type_subtype eq 4" -T fields -e wlan.sa >'+ fileName).then( function (result){
  fs.readFile(fileName, "utf8", (err,data) => {
    let formData = {};
    formData.file = data;
    formData.fileName = fileName;
    request.post({url: '', formData: formData}, function(err,res,body){console.log(body)});
  });
});	
}

Repeat(scan).every(20, 'sec').for(2, 'minutes').start.in(1, 'sec');



