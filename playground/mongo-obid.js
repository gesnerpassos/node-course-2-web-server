const {MongoClient, ObjectId} = require('mongodb');

var id = new ObjectId();

console.log( "Created id: " + id); 

MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db)=>{
  if( err)
  {
    return console.log( "Failed to connect to the mongo server", err);
  }

  console.log( "Connected to mongo db server");

  db.collection('Todos').insertOne( {
    //_id: 123, you can define an id if you want
    text: "Learn mongo db",
    completed: false
  }, (err, res)=>{
    if( err)
    {
      return console.log( "Failed to add entry to Todos", err);
    }
    console.log( JSON.stringify( res.ops, undefined, 2));

    /*
    the creation time is inside the id
    var id = res.ops[0]._id;
    console.log( id.getTimestamp());*/
  });
  db.close();
});
