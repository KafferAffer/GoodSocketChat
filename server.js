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
    
    //login
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
    
    
    socket.on('signup',function(username,password){
        
        var sql = "SELECT * FROM ChromeChat.USER WHERE navn = '"+ username +"' AND password = '"+password+"'";
        con.query(sql, function (err, result) {
            if (err) reject(err);
            if(result.length>0){
                socket.emit('errormsg',"user already exists");
            }else{
                var sql = "INSERT INTO ChromeChat.USER(navn, password) VALUES ('"+username+"','"+password+"')";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("User created");
                    socket.emit('errormsg',"user' "+username+"' created");
                });
            }
        });
        

        
    });
    //signup
    
    //chat create
    socket.on('createchat',function(chatname,userid){
        
        
        var sql = "INSERT INTO ChromeChat.CHAT(navn, owner_id) VALUES ('"+chatname+"','"+userid+"')";
        con.query(sql, function (err, result1) {
            if (err) throw err;
            console.log("Chat created");
            var sql = "SELECT * FROM ChromeChat.CHAT WHERE owner_id = '"+userid+"' ORDER BY id DESC LIMIT 1";
            con.query(sql, function (err, result2) {
                if(result2.length>0){
                    var sql = "INSERT INTO ChromeChat.MEMBER(user_id, chat_id) VALUES ('"+userid+"','"+result2[0].id+"')";
                    con.query(sql, function (err, result3) {
                        socket.emit('errormsg',"chat'"+chatname+"' created");
                    });
                }

            });
        });
        
    });
    
    //chatrequest
    socket.on('chatQuery',function(userID){
        var sql = "SELECT chat_id FROM ChromeChat.MEMBER WHERE user_id='"+userID+"'";
        con.query(sql, function (err, result) {
            if (err) reject(err);
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    var Id = result[i];
                    var sql = "SELECT navn FROM ChromeChat.CHATS WHERE id='"+Id+"'";
                    con.query(sql, function (err, result) {
                        if (err) reject(err);
                        var Navn = result;
                        socket.emit('ch',Navn,Id);
                    });
                }
            }
            else{
                //socket.emit('errormsg',"");
            }
        });
    });
    
    socket.on('getMessage',function(chatid){
        
        
        var sql = "SELECT * FROM ChromeChat.MESSAGE WHERE chat_id='"+chatid+"' ORDER BY id DESC LIMIT 5";
        con.query(sql, function (err, result) {
            if (err) throw(err);
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    var Message = result[i];
                    socket.emit('gotMessage',Message);
                    }
            }else{
                console.log("zero messages");
            }
        });
    });
    console.log(socket.id);
}



