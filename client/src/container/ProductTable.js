import React, {Component} from 'react';
import {CatalogItem, CategoryRow} from '../components/CatalogItem';

export default class ProductTable extends Component {

	render() {
		let rows = [];
		const filterText = this.props.filterText;
		const inStockOnly = this.props.inStockOnly;
		const type = this.props.type;
		let filterItems = this.props.products;
		let lastCategory = null;    
		if (type) {
			filterItems = filterItems.filter((el) => el.category.toLowerCase().indexOf(type.toLowerCase()) > -1);
		}

		filterItems.forEach((product, index) => {
			if (filterText && product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
				return;
			}
			if (inStockOnly && !product.stocked) {
				return;
			}
			if (product.category !== lastCategory) {
				rows.push(
					<CategoryRow
					category={product.category}
					key={product.category} />
				);
			}
			rows.push(
				<CatalogItem product={product} key={product.sku} 
				action={()=>this.props.action(product.sku, index)} btnName={this.props.btnName}/>
			);
			lastCategory = product.category;
		});

		return (
          <table style={{width:'100%'}}>
          <thead>
          <tr><th>Name</th><th style={{textAlign: 'right'}}>Price</th><th>action</th></tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
          </table>
		);
	}
}