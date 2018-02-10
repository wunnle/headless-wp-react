import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      dataURL: 'http://wunnle.com/headless/wp-json/wp/v2/movies?_embed'
    }
  }

  componentDidMount() {
    let dataURL = this.state.dataURL;
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          movies: res
        })
      })
  }

  render() {
    console.log('movies', this.state.movies)
    return (
      <div className="App">
        <h2>Cool Space Movies</h2>
        <p>{this.state.movies.map(movie => {
          return <div>{movie.title.rendered}</div>
        })}</p>
      </div>
    );
  }
}

export default App;
