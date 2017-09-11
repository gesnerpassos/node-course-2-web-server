const {MongoClient, ObjectId} = require('mongodb');

// MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db)=>{
//   if( err)
//   {
//     return console.log( "Failed to connect to the mongo server", err);
//   }
//
//   console.log( "Connected to mongo db server");
//
//   //db.collection('Todos').find().toArray()
//   db.collection('Todos').find({completed:false}).toArray()
//   //db.collection('Todos').find( new ObjectId("59b3fefb07bf7553a83ac2a8")).toArray()
//    .then( (docs)=>{
//      console.log(JSON.stringify(docs, undefined, 2));
//      db.close();
//    });
// });


MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db)=>{
  if( err)
  {
    return console.log( "Failed to connect to the mongo server", err);
  }

  console.log( "Connected to mongo db server");


  db.collection('Users').count((err,count)=>{
    console.log( `There are ${count} users registered`);
  })

  db.collection('Users').count().then((count)=>{
    console.log( `[Promise] There are ${count} users registered`); 
  });
  //db.collection('Todos').find().toArray()
  db.collection('Users').find().toArray()
  //db.collection('Todos').find( new ObjectId("59b3fefb07bf7553a83ac2a8")).toArray()
   .then( (docs)=>{
     console.log(JSON.stringify(docs, undefined, 2));
     db.close();
   });
});
