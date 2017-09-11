const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db)=>{
  if( err)
  {
    return console.log( "Failed to connect to the mongo server", err);
  }

  console.log( "Connected to mongo db server");

  db.collection('Todos').insertOne( {
    text: "Learn mongo db",
    completed: false
  }, (err, res)=>{
    if( err)
    {
      return console.log( "Failed to add entry to Todos", err);
    }
    console.log( JSON.stringify( res.ops, undefined, 2));
  });

  db.collection('Users').insertOne({
    name: "Gesner Passos",
    age: 33,
    location: "Didcot"
  }, (err, res)=>{
    if( err)
    {
      return console.log( "Failed to add new user", err);

    }
    console.log( JSON.stringify(res.ops, undefined, 2));

  });


  db.close();
});
