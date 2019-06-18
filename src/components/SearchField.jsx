import React, { Component } from 'react';

// Class component
class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      type: '',
    };
  }

  Search = (e) => {
    e.preventDefault();
    this.props.update(this.state.type, this.state.searchText);
  }

  render() {
    return (
      <form className="flex-col" onSubmit={(e) => this.Search(e)}>
        <input className="search"
          type="text" 
          placeholder="Search GIFS" 
          onChange={(e) => this.setState({searchText: e.target.value})} 
        />
        <div className="flex-row buttons">
          <input type="submit" value="Search" onClick={() => this.setState({type: 'search'})} />
          <input type="submit" value="Trending " onClick={() => this.setState({type: 'trending'})} />
          <input type="submit" value="Random" onClick={() => this.setState({type: 'random'})} />
        </div>
      </form>
    );
  }
}

export default SearchField;