import React, {Component} from 'react';
import './MessageBox.css'
import PropTypes from 'prop-types';
export default class MessageBox extends Component {
	render() {
		const {className, style, children, ...rest} = this.props;
		return (
			<div className={`alert ${className}`}
			style={{marginTop:'10px', ...style}}
			{...rest}>
			{children}
			</div>
		);
	}
}

MessageBox.propTypes = {
   children: PropTypes.string.isRequired
}


/*
import React, {Component} from 'react';
import './MessageBox.css';
export default class MessageBox extends Component {
  render() {
    const {className, style, children} = this.props;
    return (
        <div className={className}
          style={{...style}}>
          {children}
        </div>
     );
  }
}
*/