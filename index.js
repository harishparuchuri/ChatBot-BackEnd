const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const bearerToken=require('express-bearer-token');
const events=require('./events')

const connection=mysql.createConnection({
    host:'sql10.freesqldatabase.com',
    port:'3306',
    user:'sql10382785',
    password:'dMwmtZ7FSZ',
    database:'sql10382785'
})
connection.connect();
const port= process.env.PORT || 7000;
const app=express()
            .use(cors())
            .use(bodyParser.json())
            .use(bearerToken())
            .use(events(connection));
            

app.listen(port,()=>console.log(`RestApi Running on port ${port}`))
