import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import MessageBox from './components/MessageBox';
import TextInput from './components/TextInput';

import ProductTable from './container/ProductTable';
import SearchBar from './container/SearchBar';

// import Products from './Products';


class App extends Component {

  componentDidMount() {
    fetch('/api/products')
    .then(res => res.json())
    .then(Products => {
      this.setState({list: Products, Products: Products})
    })
  }

  constructor() {
    super();
    this.state = {
      custName: '', // customer name 
      list: [], // product list
      filterText: '', // filter text string in search bar 
      inStockOnly: false, // checkbox in search bar
      type: '', // category type in search bar
      countAdd: 0, // make sku unique when add to shopping cart
      cartProducts: [], // shopping cart
      checkOut: null, // customer name + checkout items
      Products: []
    }
  }

  handleFilterTextChange = (filterText) => {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange = (inStockOnly) => {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  onChange = (e) => {
    this.setState({custName: e.target.value});
  };
  
  onCategoryChange = (e) => {
    this.setState({type: e.options[e.selectedIndex].value});
  }
  
  copy(obj) {
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = obj[i];
        }
        return out;
    }
  }
  onAdd = (e) => {
    let cartCopy = this.state.cartProducts.slice();
    let item = this.state.Products.find(p => p.sku === e);
    if (item) {
      let itemCopy = this.copy(item); //item;
      itemCopy.sku = itemCopy.sku +'-'+ this.state.countAdd;
      cartCopy.push(itemCopy);
      cartCopy.sort((a,b)=>{return a.category > b.category});
      console.log('Add item: ' + cartCopy[cartCopy.length-1].sku);
      if (this.state.checkOut)
        this.setState({cartProducts: cartCopy, countAdd: this.state.countAdd+1, checkOut: null});
      else
        this.setState({cartProducts: cartCopy, countAdd: this.state.countAdd+1});
    }
  };

  onRemove = (e, i) => {
    let cartCopy = this.state.cartProducts.slice();
    let item = cartCopy.splice(i, 1);
    if (cartCopy) {
      this.setState({cartProducts: cartCopy})
    }
    console.log(item.name, " ", i);
    console.dir(cartCopy);
  }

  onCheckout = () => {
    let vCheckout = {name: this.state.custName, checkoutProducts: this.state.cartProducts}
    console.log();
    fetch('/api/checkout', 
      {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(vCheckout)
      })
    .then(res => res.json())
    .then(body => alert(body.message))
    this.setState({custName: '', cartProducts:[], countAdd: 0, checkOut: vCheckout});
  }

  sumTotal() {
    let sum=0; 
    for (var i in this.state.cartProducts) {
      let price = this.state.cartProducts[i].price;
      sum += parseFloat(price.substring(1,price.length));
    }
    return '$'+sum.toFixed(2); 
  }
  render() {
    // let Products = this.state.Products;
    return (
      <div className="container">
      <section className="guideline-section">
        <div className="catalog media-block blue">
          <MessageBox className="alert-info">Our Products</MessageBox>
          <SearchBar options={['Sporting Goods', 'Electronics']} placeholder='category' 
              onSelectChange={this.onCategoryChange}
              onFilterTextChange={this.handleFilterTextChange}
              onInStockChange={this.handleInStockChange}
          />
          <ProductTable products={this.state.Products.sort((a,b)=>{return a.category > b.category})}
              filterText={this.state.filterText}
              inStockOnly={this.state.inStockOnly}
              type={this.state.type}
              action={this.onAdd}
              btnName={'Add To Cart'}
          />
        </div>
        <div className="cart media-block orange">
          <MessageBox className="alert-error">Your Shopping Cart</MessageBox>
          <ProductTable products={this.state.cartProducts}
              action={this.onRemove}
              btnName={'Remove'}
          />
          <MessageBox style={{textAlign: 'right', marginRight:'3%'}}>{'Total '+this.sumTotal()}</MessageBox>
          <TextInput onChange={this.onChange} action={this.onCheckout} value={this.state.custName}/> 
          <div>{this.state.custName? this.state.custName: "---"}</div>
          <MessageBox className="alert-error">Checkout</MessageBox>
          <div>{this.state.checkOut? JSON.stringify(this.state.checkOut): ''}</div>
        </div>
      </section>
      </div>
    );
  }
}

export default App;
