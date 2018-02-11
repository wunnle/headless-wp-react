import React, { Component } from "react"
import "./style.css"
import Multi from "./Components/Multi.jsx"
import Single from "./Components/Single.jsx"

class App extends Component {
  constructor() {
    super();
    this.state = {
      allArticles: [],
      articles: [],
      dataURL: "http://wunnle.com/headless/wp-json/wp/v2/article?_embed",
      filterID: null
    };
  }

  componentDidMount() {
    let dataURL = this.state.dataURL;
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          allArticles: res,
          articles: res
        });
      });
  }

  handleArticleClick = (e, id) => {
    const articles = this.state.allArticles.filter(article => article.id === id)
    this.setState({
      filterID: id,
      articles: articles
    });
  };

  handleHomeClick = (e) => {
    e.preventDefault()
    this.setState({
      filterID: null,
      articles: this.state.allArticles
    })
  }

  render() {
    console.log("articles", this.state.articles);
    return (
      <div className="App">
        <div className="content">
          <div className="container">
            <Header handleHomeClick={this.handleHomeClick} />
            {this.state.articles.length === 1  ? <Single article={this.state.articles[0]}/> : <Multi articles={this.state.articles} handleArticleClick={this.handleArticleClick}/>}
          </div>
        </div>
        <footer>
          <div className="container">
            <i className="papership-bw" />
          </div>
        </footer>
      </div>
    );
  }
}

const Header = (props) => (
  <header>
    <i className="papership" />
    <h1 onClick={props.handleHomeClick}>
      <a href="index.html">blog</a>
    </h1>
  </header>
);
export default App;
