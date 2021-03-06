const express =  require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();


app.use(cors());
app.use(bodyparser.json());


// connect mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'angular_crud',
    port: 3306
});

// check database connection

db.connect(err => {
    if(err) {
        console.log(err, 'dberr');
    }
    console.log('database connected seccesfully ...');
})

// get all data from angular_crud Database
app.get('/user',(req,res) => {
    
    let qr = `SELECT * FROM user`;

    db.query(qr,(err,result) => {
        if(err){
            console.log(err, 'errs');
        }

        if(result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    });

});


//get single data from
app.get('/user/:id',(req,res) => {
    
    let gID = req.params.id;7
    let qr = ` SELECT * FROM user WHERE id=${gID}`;  

    db.query(qr,(err,result) => {
        if(err) {
            console.log(err);
        }

        if(result.length > 0) {

            res.send({
                message: 'get single data',
                data:result
            });
        } else {
            res.send({
                message: 'data not fund'
            });
        }
    });

});


//create data structure
app.post('/user',(req,res) => {
    
    console.log(req.body,'createdata');

    let fullname = req.body.FullName;
    let Email = req.body.email;
    let Mobile = req.body.mobile;

    let qr = `INSERT INTO user(FullName,email,mobile) VALUES('${fullname}','${Email}','${Mobile}')`;

    db.query(qr,(err,result) => {
        if(err) {
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message:'data inserted successfully'
        });
    });

});

// update single data

app.put('/user/:id',(req,res) => {


    console.log(req.body,'updatedata');

    let gID = req.params.id;
    let fullname = req.body.FullName;
    let Email = req.body.email;
    let Mobile = req.body.mobile;

    let qr = `UPDATE user SET FullName = '${fullname}', email = '${Email}', mobile = '${Mobile}' WHERE id = ${gID}`;

    db.query(qr,(err,result) => {
        if(err) {
            console.log(err);
        }
        res.send({
            message: 'data updated successfully'
        });
    });
});


// delete single data
app.delete('/user/:id',(req,res) => {

    let qID = req.params.id;

    let qr = `DELETE FROM user WHERE id = '${qID}' `;
    db.query(qr,(err,result) => {
        if(err) {
            console.log(err);      
        }
        res.send({
            message: 'data deleted successfully'
        });
    });
});





app.listen(3000,() => {
    console.log('server runnig...');
});