var mysql = require('mysql');
var promise = require('promise');
//defines the connection to localhost
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

//creates database and tables if they dont exist


    
    //Creates Chromechat
    var sql = "CREATE DATABASE IF NOT EXISTS ChromeChat";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Database created");
    });
    
    //Creates User tables
    var sql = "CREATE TABLE IF NOT EXISTS ChromeChat.USER (\
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        navn VARCHAR(30) NOT NULL,\
        password VARCHAR(512) NOT NULL\
        )";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("User table created");
    });
    
    //Creates Chat tables
    var sql = 'CREATE TABLE IF NOT EXISTS ChromeChat.CHAT (\
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        navn VARCHAR(30) NOT NULL,\
        owner_id INT(6) UNSIGNED,\
        FOREIGN KEY (owner_id) REFERENCES ChromeChat.USER(id)\
        )';
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Chat table created");
    });
    
    //Creates Member tables
    var sql = "CREATE TABLE IF NOT EXISTS ChromeChat.MEMBER (\
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        user_id INT(6) UNSIGNED,\
        chat_id INT(6) UNSIGNED,\
        FOREIGN KEY (user_id) REFERENCES ChromeChat.USER(id),\
        FOREIGN KEY (chat_id) REFERENCES ChromeChat.CHAT(id)\
        )";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Member table created");
    });
    
     //Creates Message tables
    var sql = "CREATE TABLE IF NOT EXISTS  ChromeChat.MESSAGE (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, user_id INT(6) UNSIGNED, chat_id INT(6) UNSIGNED, message varchar(255), FOREIGN KEY (user_id) REFERENCES ChromeChat.USER(id), FOREIGN KEY (chat_id) REFERENCES ChromeChat.CHAT(id))";
    
    con.query(sql, function (err, result) {
    if (err) throw err;
        console.log("Message table created");
    });
    


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
        var sql = "SELECT MEMBER.chat_id FROM ChromeChat.MEMBER WHERE user_id='".$UserId."'";
        con.query(sql, function (err, result) {
            if (err) reject(err);
            if(result.length>0){
                for(i=0;i<=result.length;i++){
                    var memberid
                    function()
                }
                socket.emit('login',true);
            }else{
                socket.emit('errormsg',"user and password doesnt exist");
            }
        });
    });

/*
    function getMemberId($UserId){
    $sql = "SELECT MEMBER.id FROM ChromeChat.MEMBER WHERE user_id='".$UserId."'";
    $result = connect()->query($sql);
    $MemberId = array();
    
    $i = 0;
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $MemberId[$i] = $row['id'];
            $i++;
        }
    }
    return $MemberId;
}
*/
    //get all tables 
    var sql = "SELECT ChromeChat.CHATS WHERE "

    