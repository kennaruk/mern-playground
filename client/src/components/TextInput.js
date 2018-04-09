import React, {Component} from 'react';
import Button from './Button';

export default class TextInput extends Component {

	render() {
		const name = this.props.label? this.props.label: 'Text Input';
		const id = name.replace(/\\s+/g, '').trim().toLowerCase();
		return (
			<div>
			<label htmlFor={id}>Your Name
				<input type="text" id={id} onChange={this.props.onChange} value={this.props.value}/>
			</label>
			<Button action={this.props.action} disabled={!this.props.value.trim().length>0}>Checkout</Button>
			</div>
		);
	}
}