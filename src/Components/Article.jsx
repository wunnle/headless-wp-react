import React, { Component } from "react";
import { Link } from "react-router-dom";
import htmlToText from "html-to-text";
import sanitizeHtml from "sanitize-html";

class Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullScreen: false,
      className: 'multi'
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

  openAnimation = (e, b) => {
    console.log(e.target)
    const art = e.target.closest("article");
    const width = art.clientWidth;
    const height = art.clientHeight;
    const top = art.getBoundingClientRect().top;
    const left = art.getBoundingClientRect().left;

    if (!this.state.fullScreen) {
      this.setState({
        savedPos: {
          left: left,
          top: top
        },
        style: {
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
            className: 'article--solo'
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


  render() {
    const article = this.props.article;
    // const content = this.props.content
    //   ? this.cleanHtml(this.props.content)
    //   : this.cleanHtml(article.content.rendered);

    const content = this.cleanHtml(article.content.rendered)
    return (
      <div>
        <article style={this.state.style} className={this.state.className}>
          <div className="article__top-details">
            <Link to={`${process.env.PUBLIC_URL}/${article.acf.category}`}>{article.acf.category}</Link>
          </div>
          <h2 onClick={this.openAnimation.bind(this)}>
            {/* <Link to={`${process.env.PUBLIC_URL}/${article.slug}`}>
              {article.title.rendered}
            </Link> */}
          <i className="emoji">{article.acf.emoji}</i>
           {article.title.rendered}
          </h2>
          <div className="article__bottom-details">
            <a className="details__datetime">{this.calcDateTime(article.date)}</a>
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
