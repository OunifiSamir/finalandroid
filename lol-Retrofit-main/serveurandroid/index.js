const mysql = require('mysql2');
const express = require('express');
const httpPort = 5000;

const app = express();

const db = mysql.createConnection({

     host: 'localhost',
     user: 'root',
     password: '',
     database: 'esprit',
     port: 3306,
     timezone: 'Z'



});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const query = require("util").promisify(db.query).bind(db)

app.get('/getperson', async function (req, res){

    var request = "SELECT * FROM 'user' ";
    const result = await query(request);
   
        res.json(null)
    
})

app.post('/login', async function (req, res){

    var request = "SELECT * FROM 'user' WHERE 'login' = ? and 'password' = ? ";
    const result = await query(request, [req.query.log, req.query.pdw]);
    if(result[0]){
        res.send(result[0])
    }else{
        res.json(null)
    }
})

 app.listen(httpPort,
    console.log("server is run en port" + httpPort)
 )
