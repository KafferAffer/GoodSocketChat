var express = require('express');
var app = express();
var server = app.listen(3000);
console.log("server is running");
app.use(express.static('public'));

//SQL STUFF
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

//connects to localhost
con.connect(function(err) {
if (err) throw err;
    console.log("Database Connected!");
});

//SOCKET STUFF
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection',newConnection);

function newConnection(socket){
    socket.on('login',function(username,password){
        console.log('navn: ' + username);
        console.log('password: ' + password);
        var sql = "SELECT * FROM ChromeChat.USER WHERE navn = '"+ username +"' AND password = '"+password+"'";
        con.query(sql, function (err, result) {
            if (err) reject(err);
            if(result.length>0){
                console.log("welcome " + username);
                socket.emit('login',true);
            }else{
                socket.emit('errormsg',"user and password doesnt exist");
            }
        });
    });
    socket.on('chatQuery',function(userID){
        var sql = "SELECT MEMBER.id FROM ChromeChat.MEMBER WHERE user_id='".$UserId."'";
    })
    console.log(socket.id);
}



