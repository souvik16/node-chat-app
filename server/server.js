const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');

console.log(publicPath);
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})