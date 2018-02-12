import React, { Component } from "react"
import "./style.css"
import Multi from "./Components/Multi.jsx"
import { Link,  Route} from 'react-router-dom';
import FakeArticle from './Components/FakeArticle'

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
    console.log(this.state.allArticles.find(a => a.slug === "kif-are-you-recording-this"))
    return (
      <div className="App">
        <div className="content">
          <div className="container">
            <Header handleHomeClick={this.handleHomeClick} />
            {/* {this.state.articles.length === 1  ? <Single article={this.state.articles[0]}/> : <Multi articles={this.state.articles} handleArticleClick={this.handleArticleClick}/>} */}
            <Route exact path={`${process.env.PUBLIC_URL}/`}
            render={() => <Multi articles={this.state.articles} handleArticleClick={this.handleArticleClick}/>}>      
            </Route>
            {this.state.allArticles.length > 0 && 
            <Route path={`${process.env.PUBLIC_URL}/:postSlug`} render={({match}) => (
              <FakeArticle articleKey={match.params.postSlug} article={this.state.allArticles.find(a => a.slug === match.params.postSlug)} />
            )}></Route>}
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
      <Link to={`${process.env.PUBLIC_URL}/`}>blog</Link>
    </h1>

  </header>
);
export default App;
