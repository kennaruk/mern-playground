import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  handleSelectChange(e) {
    this.props.onSelectChange(e.target);
  }
  
  render() {
    const props = this.props;
    return (
      <form style={{marginTop:'15px', textAlign:'center'}}>
        <label>
        Search
        <input
          type="text"
          placeholder="Search..."
          value={props.filterText}
          onChange={this.handleFilterTextChange}
        />
        </label>
        <label>
        Category
        <select
          name={props.optionName}
          value={props.selectedOption}
          onChange={this.handleSelectChange}>
          <option placeholder='Category' value=""></option>
            {props.options.map(opt => {
              return (
                <option
                  key={opt}
                  value={opt}>{opt}</option>
              );
          })}
        </select>
        </label>
        <p>
          <input
            type="checkbox"
            checked={props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}
