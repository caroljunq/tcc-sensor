const fs = require('fs');
const request = require('request');

function sendNewFile(fileName){
	fs.readFile(fileName,"utf8", (err,data) =>{
		let formData = {};
		formData.file = data;
		formData.fileName = fileName;
		request.post({url:"http://",formData: formData}, (err,res,body) =>{})
	});
}

sendNewFile('nome')