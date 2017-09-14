const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

var {app} = require('../server');
var {Todo} = require('../models/todos');
var {User} = require('../models/user');


const todos = [
  {
    _id : new ObjectId(),
    text: 'First test todo',
    completed: true,
    completedAt: 3000
  },
  {
    _id : new ObjectId(),
    text: 'Second test todo',
    completed: false,
  }
];

beforeEach((done)=>{
  Todo.remove({})
   .then( ()=>{return Todo.insertMany(todos)})
   .then( ()=>done());
});


describe( 'POST /todos', ()=>{
  it( 'should create a new todo', (done)=>{
    var text = 'Test todo text';

    request(app)
     .post('/todos')
     .send({text})
     .expect(200)
     .expect( (res)=>{
       var tod = res.body.todo;
       expect( tod.text).toBe( text );
       expect(tod.completed).toBe(false);
     })
     .end( (err, res)=>{
       if( err)
       {
         return done(err);
       }

       Todo.find({text}).then((todos)=>{
         expect(todos.length).toBe(1);
         expect(todos[0].text).toBe(text);
         done();
       }).catch((e)=>{
         done(e);
       })
     }
     );
  });

  it( 'should not create todo with invalid body data', (done)=>{
    request( app )
     .post( '/todos')
     .send({})
     .expect( 400)
     .end( (err, res)=>{
       if( err)
       {
         return done(err);
       }

       Todo.find()
         .then( (todos)=>{
           expect(todos.length).toBe(2);
           done();
         })
         .catch( (e)=>done(e));

     });

  });

});


describe( 'GET /todos', ()=>{
  it( 'should get all todos ', (done)=>{
    request( app)
    .get('/todos')
    .expect(200)
    .expect( (res)=>{
      expect(res.body.todos.length).toBe(2);
    }).end(done);
  });
})


describe( 'GET /todos/:id', ()=>{
  it( 'should return todo doc', (done)=>{
    var todo = todos[0];
    var id = todo._id.toHexString();
    request(app)
     .get(`/todos/${id}`)
     .expect( 200)
     .expect( (res)=>{
       expect(res.body.todo.text).toBe( todo.text);
     }).end((e)=>{
       if( e )
         return done(e);
       return done();
     })
  });

  it( 'should return not found for other ids', (done)=>{
    var id = (new ObjectId()).toHexString();
    request(app)
     .get( `/todos/${id}` )
     .expect(404)
     .end( (e)=>{
       done(e);
     });
  });

  it( 'should return not found for invalid id', (done)=>{
    var id = "123";
    request(app)
     .get( `/todos/${id}` )
     .expect(404)
     .end( (e)=>{
       done(e);
     });
  });
});


describe('DELETE /todos/:id', ()=>{
  it('should delete todo for a valid id', (done)=>{
    var todo = todos[1];
    var id = todo._id.toHexString();
    request(app)
     .delete(`/todos/${id}`)
     .expect( 200)
     .expect( (res)=>{
       expect(res.body.todo.text).toBe( todo.text);
     }).end((e)=>{
       if( e )
         return done(e);
       return done();
     })
  });
  it( 'should return 404 for an invalid id', (done)=>{
    var id = (new ObjectId()).toHexString();
    request(app)
     .delete( `/todos/${id}` )
     .expect(404)
     .end( (e)=>{
       done(e);
     });
  });
  it( 'should return 404 for not found id', (done)=>{
    var id = "123";
    request(app)
     .delete( `/todos/${id}` )
     .expect(404)
     .end( (e)=>{
       done(e);
     });
  });

});

describe('PATCH /todos/:id', ()=>{
 it('should make it completed and update text', (done)=>{
    var todo = todos[1];
    var newText = 'New text from update';
    var updateBody = {
      text: newText,
      completed: true,
      //not necessary and should not be used
      completedAt: 10
    };
    var id = todo._id.toHexString();
    request(app)
     .patch(`/todos/${id}`)
     .expect( 200)
     .send(updateBody)
     .expect( (res)=>{
       expect(res.body.todo.text).toBe( newText);
       expect(res.body.todo.completed).toBe( true);
       expect(res.body.todo.completedAt).not.toBe(10);
       expect(res.body.todo.completedAt).toBeGreaterThan(10000);
       Todo.findById(id).then((todo)=>{
         expect(JSON.stringify(res.body.todo)).toEqual(JSON.stringify(todo));
       });
     }).end((e)=>{
       if( e )
         return done(e);
       return done();
     })
  });
  it('should make clear completed', (done)=>{
    var todo = todos[0];
    var id = todo._id.toHexString();
    var updateBody = {
      completed: false,
    };
    request(app)
     .patch(`/todos/${id}`)
     .expect( 200)
     .send(updateBody)
     .expect( (res)=>{
       expect(res.body.todo.completed).toBe(false);
       expect(res.body.todo.text).toBe( todo.text);
       expect(res.body.todo.completedAt).toBeNull();
       Todo.findById(id).then((todo)=>{
         expect(JSON.stringify(res.body.todo)).toBe(JSON.stringify(todo));
       });
     }).end((e)=>{
       if( e )
         return done(e);
       return done();
     })
  });

  it('it should not change todo if nor completed neither text is provided', (done)=>{
    var todo = todos[0];
    var id = todo._id.toHexString();

    request(app)
     .patch(`/todos/${id}`)
     .expect( 200)
     .send({})
     .expect( (res)=>{
       expect(res.body.todo.completed).toBe(true);
       expect(res.body.todo.text).toBe( todos[0].text);
       expect(res.body.todo.completedAt).toBe(3000);
       Todo.findById(id).then((todo)=>{
         expect(JSON.stringify(res.body.todo)).toBe(JSON.stringify(todo));
       });
     }).end((e)=>{
       if( e )
         return done(e);
       return done();
     })
  });

  it( 'should return 404 for an invalid id', (done)=>{
    var id = (new ObjectId()).toHexString();
    request(app)
     .patch( `/todos/${id}` )
     .expect(404)
     .end( (e)=>{
       done(e);
     });
  });

  it( 'should return 404 for not found id', (done)=>{
    var id = "123";
    request(app)
     .patch( `/todos/${id}` )
     .expect(404)
     .end( (e)=>{
       done(e);
     });
  });

});
