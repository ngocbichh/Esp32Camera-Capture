var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");
var topic = 'esp/test';
client.on('connect',function()
{
    console.log("connected");
});