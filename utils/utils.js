module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback)=>{
  setTimeout(()=>{
    callback(a+b);
  }
  , 100);
};

module.exports.cbAdd = (a, b, callback)=>{
  callback(a+b);
};

module.exports.asyncPromisseAdd = function (a, b)
{
  return new Promise (( resolve, reject) =>{
    setTimeout(()=>{
      resolve(a+b);
    }
    , 100);
  });

};
