const request = require('supertest');
const expect = require('expect');

const app = require('./server').app;


it( 'should contain Home Page', (done)=>{
  request(app)
   .get('/')
   .expect(200)
   .expect((res)=>{
     expect(res.text).toMatch(/Home Page/);
   })
   .end( done);
});
