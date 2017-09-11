const {ObjectID} = require('mongodb');
const {mongoose} = require('../api/db/mongoose');
const {Todo} = require('../api/models/todos');
const {User} = require('../api/models/users');
var id = "59b705a3a468ff39fc410998";
var wrongid = "59b705a3a468ff39fc410991";
var invalidid = "59705a3a468ff39fc410991";
// Todo.find({_id:id}).then((todos)=>{console.log( todos); });
// Todo.findOne({_id:id}).then((todo)=>{console.log( todo); });
// Todo.findById(id).then((todo)=>{console.log( todo); });
// Todo.findById(wrongid).then((todo)=>{
//   if( !todo )
//     return console.log( 'id not found');
//
//   console.log( todo);
//
//
// });
//
//
// if( !ObjectID.isValid(invalidid)){
//   console.log( 'Object id is not valid');
// }

// Todo.findById(invalidid).then((todo)=>{
//   if( !todo )
//     return console.log( 'id not found');
//
//   console.log( todo);
// }).catch((e)=>{
//   console.log(e);
// });
