import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import htmlToText from "html-to-text";
import sanitizeHtml from "sanitize-html";

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullScreen: false,
      className: this.props.solo ? 'article--solo' : 'multi'
    }
  }

  cleanHtml = html => {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "b",
        "i",
        "em"
      ])
    });
  }

  updateURL = () => {
    window.history.pushState('page2', 'Title', `${process.env.PUBLIC_URL}/${this.props.article.slug}`);
  }

  openAnimation2 = (article) => {
    console.log(article)
    if(article!== null) {
      console.log(article)
      const art = article
      const width = art.clientWidth;
      const height = art.clientHeight;
      const top = art.getBoundingClientRect().top;
      const left = art.getBoundingClientRect().left;
      console.log('left', left)
  
      // this.updateURL()
  
      if (!this.state.fullScreen) {
        let stateObj = {foo: 'bar'}
        this.setState({
          savedPos: {
            left: left,
            top: top
          },
          style: {
            position: 'fixed',
            left: left,
            top: top,
            height: height
          },
          shadowStyle: {
            width: width,
            height: height
          },
          fullScreen: true,
          className: 'article--animating'
        });
  
        setTimeout(() =>
            this.setState({
              style: {
                zIndex: 10,
              },
              className: 'article--animated'
            }),
          0
        );
  
        setTimeout(() => {
          let copy = JSON.parse(JSON.stringify(this.state.style))
          copy.overflow = "auto"
          this.setState({
            style: copy
          });
        }, 550);
  
        document.querySelector("body").classList.add("no-overflow");
      }
    }
  };

  openAnimation = (e, b) => {
    console.log(e.target)
    const art = e.target.closest("article");
    const width = art.clientWidth;
    const height = art.clientHeight;
    const top = art.getBoundingClientRect().top;
    const left = art.getBoundingClientRect().left;
    console.log('left', left)

    // this.updateURL()

    if (!this.state.fullScreen) {
      let stateObj = {foo: 'bar'}
      this.setState({
        savedPos: {
          left: left,
          top: top
        },
        style: {
          position: 'fixed',
          left: left,
          top: top,
          height: height
        },
        shadowStyle: {
          width: width,
          height: height
        },
        fullScreen: true,
        className: 'article--animating'
      });

      setTimeout(() =>
          this.setState({
            style: {
              zIndex: 10,
            },
            className: 'article--animated'
          }),
        0
      );

      setTimeout(() => {
        let copy = JSON.parse(JSON.stringify(this.state.style))
        copy.overflow = "auto"
        this.setState({
          style: copy
        });
      }, 550);

      document.querySelector("body").classList.add("no-overflow");
    }
  };

  closeAnimation = (e, b) => {
    this.setState({
      style: {
        position: 'fixed',
        left: this.state.savedPos.left,
        top: this.state.savedPos.top,
      },
      fullScreen: false,
      className: 'article--animating'
    });

    setTimeout(() => {
      this.setState({
        style: {},
        fullScreen: false,
        className: 'multi',
        shadowStyle: {}
      });
    }, 550);

    document.querySelector("body").classList.remove("no-overflow");

    window.history.pushState('home', 'home', `${process.env.PUBLIC_URL}/`);
  }

  closeAnimation2 = (article) => {
    console.log('trying to close')
    this.setState({
      style: {
        position: 'fixed',
        left: this.state.savedPos.left,
        top: this.state.savedPos.top,
      },
      fullScreen: false,
      className: 'article--animating'
    });

    setTimeout(() => {
      this.setState({
        style: {},
        fullScreen: false,
        className: 'multi',
        shadowStyle: {}
      });
    }, 550);

    document.querySelector("body").classList.remove("no-overflow");

    window.history.pushState('home', 'home', `${process.env.PUBLIC_URL}/`);
  }


  render() {
    const article = this.props.article;
    // const content = this.props.content
    //   ? this.cleanHtml(this.props.content)
    //   : this.cleanHtml(article.content.rendered);

    let content
    if(this.props.solo || this.state.fullScreen) {
      content = this.cleanHtml(article.content.rendered)
    } else {
      content = this.cleanHtml(article.excerpt.rendered)
    }
    

    return (
      <div>
      <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
        this.state.fullScreen && this.closeAnimation2(document.querySelector('#p' + this.props.article.id))
        console.log('is state fullscreen for ' + article.title.rendered + ' ' + this.state.fullScreen) 
        return ""
      }}></Route>
      <Route path={`${process.env.PUBLIC_URL}/:postSlug`} render={({match}) => {
        if(match.params.postSlug === this.props.article.slug) {
          console.log('its a match')
          console.log(!this.state.fullScreen)
          console.log(this.props.article.id)
          document.querySelector('#p' + this.props.article.id)
          !this.state.fullScreen && this.openAnimation2(document.querySelector('#p' + this.props.article.id))
          if(!document.querySelector('#p' + this.props.article.id)) {
            this.setState({
              className: 'article--solo',
              style: {
                transition: 'none'
              }
            })
          }
        } else {}
        return ''
      }}></Route>
        <article style={this.state.style} className={this.state.className} id={'p' + this.props.article.id}>
          <div className="article__top-details">
            <Link to={`${process.env.PUBLIC_URL}/${article.acf.category}`}>{article.acf.category}</Link>
          </div>
          {/* <h2 onClick={this.openAnimation.bind(this)}> */}
          <h2>

          <i className="emoji">{article.acf.emoji}</i>
          <Link to={`${process.env.PUBLIC_URL}/${article.slug}`}>
              {article.title.rendered}
            </Link>
          </h2>
          <div className="article__bottom-details">
            <a className="details__datetime" onClick={this.closeAnimation.bind(this)}>{this.calcDateTime(article.date)}</a>
            <a>{this.calcTimeToRead()} minute read</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
        <div className="articleShadow" style={this.state.shadowStyle}></div>
      </div>
    );
  }
  calcTimeToRead = e => {
    let words,
      imgs = 0;

    const wps = 0.218340611,
      ips = 12;

    let el = document.createElement("html");
    el.innerHTML = this.props.article.content.rendered;
    imgs = el.querySelectorAll("img").length;

    words = htmlToText.fromString(this.props.article.content.rendered).length;
    return Math.floor(Math.floor((words * wps + imgs * ips) / 60));
  };
  calcDateTime = t => {
    const date = new Date(t)
    let dateStr

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const now = new Date()

    if (now.getFullYear() ==! date.getFullYear()) {
      dateStr = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()
    } else if(now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() == date.getDate() ) {
      if(date.getHours() - now.getHours() > 0) {
          dateStr = date.getHours() - now.getHours() + ' hours ago'
      } else {
          dateStr = 'just now'
      }
    } else {
      dateStr = months[date.getMonth()] + ' ' + date.getDate()
    }


    return dateStr
  }
}

export default Article;
