const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const bearerToken=require('express-bearer-token');
const events=require('./events')

const connection=mysql.createConnection({
    host:'b31ska00hm5nbt27tr40-mysql.services.clever-cloud.com',
    port:'3306',
    user:'uopectih4fo1kadl',
    password:'g7yNXozSPP7TnZgdkXxF',
    database:'b31ska00hm5nbt27tr40'
})
connection.connect();
const port= process.env.PORT || 8000;
const app=express()
            .use(cors())
            .use(bodyParser.json())
            .use(bearerToken())
            .use(events(connection));
            

app.listen(port,()=>console.log(`RestApi Running on port ${port}`))