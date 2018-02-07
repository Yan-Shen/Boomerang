import React, { Component } from 'react';
import {Card,TextField,RaisedButton} from 'material-ui';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return (
      <div className="search-bar">
        <TextField onChange={(e,val) => this.onInputChange(val)} floatingLabelStyle={{fontSize: '22px'}} style={{margin: "10px", width: '90%'}} floatingLabelText="Video Search"/>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}


 export default SearchBar;
