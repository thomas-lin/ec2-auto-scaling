let os = require("os");
let os_utils = require("os-utils")
let express = require('express');
let spawn = require('child_process').spawn;
let path = require("path");
let fs = require('fs');

let app = express();
let port = process.env.PORT || 3000;

let child;
app.use("/cpu-up" , function(req , res){
    res.send("CPU up Now...");    
    child = spawn("node",[path.join(__dirname,"child.js")]);
    child.stdout.on('data', function(data){
        console.log("stdout:\n"+data);
    });

    child.stderr.on('data', function(data){
        console.log("stderr:\n"+data);
    });

    child.on('close', function(code){
        console.log("cloneSpawn process exited with code:"+code);
    });
});
app.use("/cpu-down" , function(req , res){
    res.send("CPU Down Now...");
    child.kill('SIGINT');
});
app.use("/cpu-usage" , function(req , res){
    os_utils.cpuUsage(function(v){
        res.send('CPU Usage (%): ' + Number(v*100).toFixed(2) + " ,on host:"+os.hostname());
    });
});
app.use(express.static(__dirname + '/app'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
