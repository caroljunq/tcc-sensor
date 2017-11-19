const Repeat = require('repeat');
const exec = require('child-process-promise').exec;
const request = require('request');
const fs = require('fs');

exec('ifconfig wlan1 down')
    .then(exec('iwconfig wlan1 mode monitor')
         .then(exec('ifconfig wlan1 up')));


function sendFiles(){
  fs.readdir('./', (err, files) => {
  files.forEach(file =>{
    let name = file.split('_');
    if(name[0] == 'not-sent'){
      
      fs.readFile(file, "utf8", (err, data) =>{
        let formData = {};
        formData.file = data;
        formData.fileName = name[1]+'_'+name[2]+'_'+name[3];
        request.post({url:"http://",formData: formData}, (err, res,body) => {
          if(!err)
            fs.rename(file,formData.fileName, (err) => {});

        });
      })
    }

  })

});
}

function scan() {
  sendFiles();
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth(); 
  let year   = date.getFullYear();
  let hour = date.getHours();
  if(hour < 10){
    hour = '0'+hour;
  }
  let fileName = 'LTIA_'+year+'-'+month+'-'+day+'_'+hour+'-00';

  exec('tshark -i wlan1 -a duration:18 -Y "wlan.fc.type_subtype eq 4" -T fields -e wlan.sa >'+ fileName)
    .then((result) => {
      fs.readFile(fileName, "utf8", (err,data) => {
        let formData = {};
        formData.file = data;
        formData.fileName = fileName;
        request.post({url: 'http://', formData: formData}, (err,res,body) => {
          if(err){
            fs.rename(fileName,'not-sent_'+fileName, (err) =>{})
          }
        });     
      });
    });	
}

Repeat(scan).every(20, 'sec').for(2, 'minutes').start.in(1, 'sec');



