import React, {Component} from 'react';
import sanitizeHtml from 'sanitize-html'
import logo from './logo.svg'
import './style.css'

class Article extends Component {
  render() {
    return(
      <article>
      <h2><i className="emoji">{this.props.emoji}</i><a href="#">{this.props.title}</a></h2>
        <div className="details">
            <a href="#">{this.props.cat}</a>
            <a href="#">3 minute read</a>
        </div>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(this.props.content) }}></div>
    </article>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      articles: [],
      dataURL: 'http://wunnle.com/headless/wp-json/wp/v2/article?_embed'
    }
  }

  componentDidMount() {
    let dataURL = this.state.dataURL;
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          articles: res
        })
      })
  }

  render() {
    console.log('articles', this.state.articles)
    return (
      <div className="App">
          <div className="content">
        <div className="container">
            <header>
                <i className="papership"></i>
                <h1>A web design<a href="index.html">blog</a></h1>
            </header>
            <p>
            {this.state.articles.map(article => 
            <Article key={article.key} title={article.title.rendered} content={article.content.rendered} cat={article.acf.category} emoji={article.acf.emoji} />
            )}</p>
            <div className="pagination">
                <a className="right" href="#">See older articles</a>
            </div>
        </div>
    </div>
    <footer>
        <div className="container">
            <i className="papership-bw"></i>
        </div>
    </footer>
      </div>
    );
  }
}

export default App;
