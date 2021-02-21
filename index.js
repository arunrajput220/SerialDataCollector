var SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM5", {
  baudRate: 115200
});


const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function () {
  console.log('connection is opened');
});


parser.on('data', function (data) {
    sendTemperatureData(data.slice(0, 5))
    sendHumidityData(data.slice(6, 11))
  })

function sendTemperatureData(tempval){
  var request = require('request');
var options = {
  'method': 'PUT',
  'url': 'https://iotapp-aad4a.firebaseio.com/temperature.json',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: tempval

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}

function sendHumidityData(humidval){
  var request = require('request');
  var options = {
  'method': 'PUT',
  'url': 'https://iotapp-aad4a.firebaseio.com/humidity.json',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: humidval

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
}









