const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const bearerToken=require('express-bearer-token');
const events=require('./events')

const connection=mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    port:'3306',
    user:'sql12381356',
    password:'NJpwhMqSzh',
    database:'sql12381356'
})
connection.connect();
const port= process.env.PORT || 3100;
const app=express()
            .use(cors())
            .use(bodyParser.json())
            .use(bearerToken())
            .use(events(connection));
            

app.listen(port,()=>console.log(`RestApi Running on port ${port}`))
