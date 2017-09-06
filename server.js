const express = require('express');
const hbs = require('hbs');

hbs.registerPartials(__dirname + "/views/partials");

var app = express();
var port = process.env.Port || 3000;
app.set('view engine', 'hbs');

app.use( express.static(__dirname + "/public"));

/*
using middlewares
app.use((req, res, next)=>{
  var now = new Date().toString();
  console.log( now + " " + req.method + " " + req.url);
  // will stop here and respond from here
  res.render('maitainance.hbs');

  // allow other middlewares to procceed
  //next();
});
*/
hbs.registerHelper('fullYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('name', (ind, options ) => {
  if( ind === 1)
    return "gesner " + options.hash.cls;
  else
    return "anna";
});

hbs.registerHelper('list', function(items, options) {
  var out = "<ul>";

  for(var i=0, l=items.length; i<l; i++) {
    out = out + "<li>" + options.fn(items[i]) + "</li>";
  }

  return out + "</ul>";
});

app.get( '/', (req, res)=>{
  res.render('about.hbs', {pageTitle: 'Home Page'});

});
app.get('/about', (req,res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    people: [
      {firstName: "Yehuda", lastName: "Katz"},
      {firstName: "Carl", lastName: "Lerche"},
      {firstName: "Alan", lastName: "Johnson"}
    ]
 });
  //res.render(hbs.templates['templates'],  {pageTitle: 'About Page' });
});

app.listen(port, ()=>{
  console.log("server is ready to go");
});
