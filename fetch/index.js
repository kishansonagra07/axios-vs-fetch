const express = require('express');
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get(['/','/index'], (req, res) =>  {
    res.render('pages/index');
});

app.post("/add",(req,res)=>{
    const userObject = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        token : req.headers.authorization.split(' ')[1]
    }
    fs.readFile('./userList.json', 'utf-8', function(err, data) {
        if (err)  return res.status(500).json({
            status:'failed',
            message : 'Something went wrong'
        });
    
        var arrayOfObjects = JSON.parse(data)
        arrayOfObjects.list.push(userObject);
    
        fs.writeFile('./userList.json', JSON.stringify(arrayOfObjects,null,4), 'utf-8', function(err) {
            if (err)  return res.status(500).json({
                status:'failed',
                message : 'Something went wrong'
            });
        })
    })
    res.status(200).json({
        status:'success',
        message:'Data added succesfully'
    });
});

app.listen(3000);
console.log('Server is running on port 3000');