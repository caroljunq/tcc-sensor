var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;

var macs = [];

function puts(error, stdout, stderr) { sys.puts(stdout) }


/**
 * @description
 * Função para ler o arquivo linha por linha (registro)
 *
 * @param {input} arquivo a ser livo
 *   @type {func} checkMacAddress
 */
function readLines(input, func) {
  // é o que ainda resta para ler do arquivo
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      checkMacAddress(line);
      index = remaining.indexOf('\n');
    }

  });

  input.on('end', function() {
    if (remaining.length > 0) {
      checkMacAddress(remaining);
    }else{
      console.log("Por aqui há " + macs.length + " pessoas");
    }
  });
}

/**
 * @description
 * Função para ler o arquivo linha por linha (registro)
 *
 * @param {input} arquivo a ser livo
 *   @type {func} checkMacAddress
 */

function checkMacAddress(data) {
  var array = data.split("\t");
  if (macs.indexOf(array[0]) == -1 && array[0] != ""){
      macs.push(array[0]);
  }
}

module.exports.numPeople = function(){
  exec("tshark -i wlan1 -T fields -e wlan.sa -e frame.time > output.txt");
  var input = fs.createReadStream("output.txt");
  readLines(input, checkMacAddress);
}
