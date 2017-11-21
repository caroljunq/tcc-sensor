const Repeat = require('repeat');
const exec = require('child-process-promise').exec;
const request = require('request');
const fs = require('fs');
const events = require('events');

let eventEmitter = new events.EventEmitter();
let fileName = '';
let lastDate;

exec('ifconfig wlan1 down')
    .then(exec('iwconfig wlan1 mode monitor')
         .then(exec('ifconfig wlan1 up')));

function sendNewFile(){
    fs.readFile(fileName, "utf8", (err, data) =>{
        let formData = {};
        formData.file = data;
        formData.fileName = name[1]+'_'+name[2]+'_'+name[3];
        request.post({url:"http://",formData}, (err, res, body) =>{
            if(!err){
                fs.rename(fileName, 'sent_'+file, (err) => {});
            }else if(err){
                fs.rename(fileName,'not-sent_'+file, (err) =>{})
            }
        startDate();
        });
    });
}
///read all files in directory.If file name is the same that prefix, then try to send file to server.
function sendAllFiles(){
    fs.readdir('./', (err, files) => {
        files.forEach(file =>{
            let name = file.split('_');
            if(name[0] == 'not-sent'){
                fs.readFile(file, "utf8", (err, data) =>{
                    let formData = {};
                    formData.file = data;
                    formData.fileName = name[1]+'_'+name[2]+'_'+name[3];
                    request.post({url:"http://",formData}, (err, res, body) =>{
                        if(!err){
                            fs.rename(file, 'sent_'+file, (err) => {});
                        }
                    });
                });
            }
        });
    });
}

function startDate(){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year   = date.getFullYear();
    let hour = date.getHours();
    if(hour < 10){
      hour = '0'+hour;
    }
    lastDate = date;
    fileName = 'LTIA_'+year+'-'+month+'-'+day+'_'+hour+'-00';
    fs.writeFile(fileName, '', (err) => {});
}

function scan() {
  exec('tshark -i wlan1 -Y "wlan.fc.type_subtype eq 4" -T fields -e wlan.sa')
    .then((result) => {
        let date = new Date();
        if(date.getHours() == lastDate){
            fs.appendFile(fileName,result.stdout, (err) => {});
        }else{
            sendNewFile();
        }
    });
}


Repeat(scan).every(20, 'sec').for(2, 'minutes').start.now(); //every 20 seconds
Repeat(createFile).every(30, 'sec').for(2, 'minutes').start.in(3,'minutes');
