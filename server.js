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
                console.log("welcome " + result[0].navn);
                socket.emit('login',true,result[0].id,result[0].navn);
            }else{
                socket.emit('errormsg',"user and password doesnt exist");
            }
        });
    });
    
    socket.on('createchat',function(chatname,userid){
        console.log(chatname+userid);
        var sql = "INSERT INTO ChromeChat.CHAT(navn, owner_id) VALUES ('"+chatname+"','"+userid+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Chat created");
            socket.emit('errormsg',"chat'"+chatname+"' created");
        });
    });
    
    console.log(socket.id);
}



