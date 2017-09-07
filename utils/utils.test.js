const expect = require('expect');
const jest = require('jest-mock');
const utils = require('./utils');

it('it should add two numbers',() => {
  var res = expect(utils.add(33,11));

  res.toBe(44);
  res.toEqual(expect.any(Number));
  /*if( res !== 44)
    throw new Error( `Expected: 44, but got ${res}`);*/
} );
it('check expect',()=>{
//  expect('a string').toMatch(/string/);

expect({m:'hello'}).toMatchObject({m:expect.stringMatching(/ell|car/)});
expect({m:'car'}).toMatchObject({m:expect.stringMatching(/ell|car/)});//toMatch
expect([1,2,3]).toContain(2);// toInclude
expect({m:'car',c:'ok'}).toHaveProperty('m','car');// toInclude
expect({m:'car',c:'ok'}).toMatchObject({m:'car'});// toInclude
}
);

it( 'check async expect', (done) =>{
  utils.asyncAdd(3,4, (res)=>{
    expect( res).toBe(7);
    done();
  })
});

it( 'check async expect with promise', () =>{
  expect(utils.asyncPromisseAdd(3,4)).resolves.toBeCalledWith(7);
});

it( 'check spy callback', ()=>{
  var mock = jest.fn();
  utils.cbAdd(3,4,mock);
  expect( mock ).toBeCalledWith(7);
});
