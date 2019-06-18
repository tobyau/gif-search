import React, { Component } from 'react';
import SearchField from './components/SearchField';
import GifCard from './components/GifCard';
import axios from 'axios';
import API_KEY from './api_key';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifs: []
    }
  }

  /*
  - gets api from api key based on search 
  - Regular Search: http://api.giphy.com/v1/gifs/search?q=SEARCH+TERM+GOES+HERE&api_key=YOUR_API_KEY
  - Trending Search: http://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY
  - Random Search: http://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY
  */
  Search = (type, search_string) => { 
    axios.get(`http://api.giphy.com/v1/gifs/${type}?${type === 'search' ? `q=${search_string}&` :  ''}api_key=${API_KEY}`)
    .then(res => {
      const data = type === 'random' ? Array(1).fill(res.data.data) : (res.data.data) ;
      const search_gifs = data.map((gif) => gif.images.original);
      this.setState({gifs: search_gifs});
    })
    .catch(err => console.error(err));
  }

  // mounts API search to DOM tree
  componentDidMount() {
    this.Search('trending');
  }

  render() {
    return (
      <div>
        <h1 className="title">GIF Search</h1>
        <SearchField update={this.Search} />
        <GifCard gifs={this.state.gifs} />
      </div>
    );
  }
}

export default App;
