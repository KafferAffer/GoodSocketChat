var mysql = require('mysql');
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
    
/* SQL TEMPLATE
var sql = "WE HAVE SQL HERE\(\ FOR MULTILINE CODE)
    )";

con.query(sql, function (err, result) {
if (err) throw err;
    console.log("WHAT WAS CREATED");
});
*/

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

sql ="ALTER TABLE ChromeChat.USER CONVERT TO CHARACTER SET utf8";

con.query(sql, function (err, result) {
if (err) throw err;
    console.log("User table fixed");
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

sql ="ALTER TABLE ChromeChat.CHAT CONVERT TO CHARACTER SET utf8";

con.query(sql, function (err, result) {
if (err) throw err;
    console.log("chat table fixed");
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

sql ="ALTER TABLE ChromeChat.MEMBER CONVERT TO CHARACTER SET utf8";

con.query(sql, function (err, result) {
if (err) throw err;
    console.log("Member table fixed");
});

 //Creates Message tables
var sql = "CREATE TABLE IF NOT EXISTS  ChromeChat.MESSAGE (\
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
    user_id INT(6) UNSIGNED,\
    chat_id INT(6) UNSIGNED,\
    message VARCHAR(255),\
    FOREIGN KEY (user_id) REFERENCES ChromeChat.USER(id),\
    FOREIGN KEY (chat_id) REFERENCES ChromeChat.CHAT(id)\
    )";

con.query(sql, function (err, result) {
if (err) throw err;
    console.log("Message table created");
});

sql ="ALTER TABLE ChromeChat.MESSAGE CONVERT TO CHARACTER SET utf8";

con.query(sql, function (err, result) {
if (err) throw err;
    console.log("Message table fixed");
});
