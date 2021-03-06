require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

var {
  ObjectId
} = require('mongodb');
var {
  mongoose
} = require('./db/mongoose');
var {
  Todo
} = require('./models/todos');
var {
  User
} = require('./models/user');

var app = express();
app.use(bodyParser.json());

const port = process.env.PORT;

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send({
      todo: doc
    });
  }, (e) => {
    res.status(400).send(e);
  });

});


app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({
        todos
      });
    }, (e) => {
      res.status(404).send(e);
    });

});
function getbyid( id, res){
  if (!ObjectId.isValid(id)) {
    return res.status(404).send({});
  }
  Todo.findById(id)
    .then((todo) => {
      if (todo) {
        return res.send({
          todo
        });
      }
      res.status(404).send({});
    }).catch((e) => {
      console.log('Exception from by id', e);
      return res.status(400).send({});
    });
};

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  getbyid(id, res);
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send({});
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (todo) {
      return res.send({
        todo
      });
    }
    res.status(404).send({});
  }).catch((e) => {
    console.log('Exception from by id', e);
    return res.status(400).send({});
  });
});


app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send({});
  }

  var body = _.pick(req.body, ['text', 'completed']);

  if ( _.isEmpty(body) ){
    return getbyid(id, res);
  }


  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (todo) {
      return res.send({
        todo
      });
    }
    res.status(404).send({});
  }).catch((e) => {
    console.log('Exception from by id', e);
    return res.status(400).send({});
  });

});




app.listen(port, () => {
  console.log(`Started up at port ${port}`);
})


module.exports.app = app;
