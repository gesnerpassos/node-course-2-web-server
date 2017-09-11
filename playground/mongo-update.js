const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db)=>{
  if( err)
  {
    return console.log( "Failed to connect to the mongo server", err);
  }

  console.log( "Connected to mongo db server");
  // db.collection('Todos').findOneAndUpdate(
  //   {_id: new ObjectId("59b44154a90f5b8d43c0a385")},
  //   {
  //     $set: {
  //       completed: true
  //     }
  //   },
  //   {
  //     returnOriginal: false
  //   })
  //   .then( (res)=>{
  //     console.log(res);
  //     db.close();
  //   });


  db.collection('Users').findOneAndUpdate({name:'Luisa'},{
    $set: {
      name: 'Luisa Passos'
    },
    $inc: {age: 1}
  },{
    returnOriginal: false
  })
    .then( (res)=>{
      console.log( res);
      db.close();
    })
});
