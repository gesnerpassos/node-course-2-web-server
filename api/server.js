const express = require('express');
const bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();
app.use( bodyParser.json() );

const port = process.env.PORT || 3000;

app.post('/todos', (req, res)=>{
  var todo = new Todo({text: req.body.text});

  todo.save().then((doc)=>{
      res.send( doc );
  }, (e)=>{
      res.status( 400).send(e);
  });

});


app.get('/todos', (req,res)=>{
  Todo.find()
   .then( (todos)=>{
     res.send( {todos});
  }, (e)=>{
    res.status(404).send(e);
  });

});


app.listen(port, ()=>{
  console.log("server is ready to go");
})


module.exports.app = app;
