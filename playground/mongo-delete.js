const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApi', (err, db)=>{
  if( err)
  {
    return console.log( "Failed to connect to the mongo server", err);
  }

  console.log( "Connected to mongo db server");
//delete Many
  // db.collection('Todos').deleteMany({text:'Eat lunch'}).
  //   then( (result)=>{
  //     console.log(result);
  //   });

  // db.collection( 'Todos').deleteOne( {text: 'Eat lunch'})
  //   .then( (result)=>{
  //     console.log( result);
  //     db.close();
  //   });

  // db.collection('Todos').findOneAndDelete({completed: false})
  //   .then( (res)=>{
  //     console.log( res);
  //     db.close();
  //   })



  db.collection('Users').findOneAndDelete({_id: new ObjectId("59b44394a90f5b8d43c0a3f7")})
    .then( (res)=>{console.log( res); db.close();});
});
