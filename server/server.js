const  express = require('express');
const cors = require('cors');
const mysql = require('mysql');

//create expres app
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//MySQL connection
const connection = mysql.createConnection({
    host:'localhost',
    user:'dummy',
    password:'react@123',
    database:'POLL'
});

connection.connect((err)=>{
    if(err){
        console.error('Error connecting to database',err);
        return;
    }
    console.log('connected to database');
});

app.get('/api/poll',(req,res)=>{
    const query = 'SELECT * FROM POLLING_OPTIONS';
    connection.query(query,(err,result)=>{
        if(err){
            return res.status(500).json({error:'Failed to fetch poll results'});
        }
        return res.status(200).json(result);
    })
})

app.post('/api/vote',(req,res)=>{
    const {option} = req.body;
    const query = 'UPDATE POLLING_OPTIONS SET VOTES = VOTES + 1 WHERE OPTION_NAME = ?';
    connection.query(query,[option],(err,result)=>{
        if(err){
            return res.status(500).json({error:'Failed to submit vote'});
        }
        return res.status(200).json({success:true});
    });
});

app.listen(port,()=>{
    console.log('Server is running on http://localhost:',port);
});