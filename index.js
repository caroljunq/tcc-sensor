const Repeat = require('repeat');
const exec = require('child-process-promise').exec;
const request = require('request');
const fs = require('fs');

let fileName = '';
let countScan = 0;

exec('ifconfig wlan1 down')
    .then(exec('iwconfig wlan1 mode monitor')
         .then(exec('ifconfig wlan1 up')));

function sendNewFile(){
    fs.readFile(fileName, "utf8", (err, data) =>{
        let formData = {};
        formData.file = data;
        formData.fileName = fileName;
        request.post({url:"http://",formData: formData}, (err, res, body) =>{
            if(err){
                fs.rename(fileName,'not-sent_'+fileName , (err) =>{})
            }
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
                        console.log(formData.fileName);
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
    fs.writeFile('temp', '', (err) => {
        countScan = 0;
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year   = date.getFullYear();
        let hour = date.getHours();
        if(hour < 10){
          hour = '0'+hour;
        }
        fileName = 'LTIA_'+year+'-'+month+'-'+day+'_'+hour+'-00';
        fs.writeFile(fileName, '', (err) => {});
        Repeat(scan).every(60, 'sec').for(50, 'minutes').start.now();
    });
}

function scan(){
    exec('tshark -i wlan1 -a duration:40 -Y "wlan.fc.type_subtype eq 4" -T fields -e wlan.sa > temp')
        .then((result) => {
            countScan++;
            fs.readFile('temp', "utf8", (err, data) =>{
                fs.appendFile(fileName,data, (err) => {
                    if(countScan == 50)
                        sendNewFile();
                });
            });
        });
}

Repeat(startDate).every(60, 'minutes').for(300, 'minutes').start.now();

//Repeat(sendAllFiles).every(5, 'minutes').for(10, 'minutes').start.now();
