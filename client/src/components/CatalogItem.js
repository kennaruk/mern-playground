import React, {Component} from 'react';
import Button from './Button';


export class CatalogItem extends Component {
	render() {
		const product = this.props.product;
		const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;

		return (<tr>
			<td>{name}</td><td style={{textAlign: 'right'}}>{product.price}</td>
			<td style={{textAlign: 'center'}}><Button action={this.props.action} disabled={!product.stocked}>{this.props.btnName}</Button></td>
		</tr>);
	}
};

export const CategoryRow = props => {return (<tr className='rowHeader'><th colSpan="3">{props.category}</th></tr>) }
