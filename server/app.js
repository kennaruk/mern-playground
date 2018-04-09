var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost', err => {
  if(err)
    console.log('connect mongo err', err)
  else
    console.log('conntent mongo success')
})
console.log('state: ',mongoose.connection.readyState);
const productSchema = new Schema({
  category: { type: String },
  price: { type: String },
  stocked: { type: Boolean },
  name: { type: String },
  sku: { type: String }
});
const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json())

app.get('/fetch', function(req, res) {
  Product.remove({}, function(err) {
    if(!err) 
      console.log('remove all data and fetch new')
    else
      console.log('remove all data err', err)
  })
  const data = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football', sku:'1234'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball', sku:'3444'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball', sku:'1344'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch', sku:'3422'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5', sku:'2567'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7', sku:'3214'}
  ]
  data.forEach(datum => {
    let newProduct = new Product(datum);
    newProduct.save((err, products) => {
      console.log(products)
      if(err)
        console.log('fetch data err', err)
      else
        console.log('add new data')
    })
  });
  
  res.redirect('/api/products')
})
app.get('/', function (req, res) {
  
  res.send('Hello World!')
})

app.get('/api/products', function(req, res, next) {
  // const Products = [
  //   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football', sku:'1234'},
  //   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball', sku:'3444'},
  //   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball', sku:'1344'},
  //   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch', sku:'3422'},
  //   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5', sku:'2567'},
  //   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7', sku:'3214'}
  // ];
  Product.find({}, function(err, products) {
    res.json(products)
  })
  // res.header("Access-Control-Allow-Origin", "*");
  // res.json(Products);
});

app.post('/api/checkout', function(req, res, next) {
  console.log(req.body);
  res.json({
    status: true, 
    message: "Thank you for checkout!"
  });
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})
