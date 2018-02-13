import React, { Component } from "react";
import { Link } from "react-router-dom";
import htmlToText from 'html-to-text'
import sanitizeHtml from 'sanitize-html'



class Article extends Component {
  cleanHtml = (html) => {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'b', 'i', 'em'])
    })
  }
  render() {
    const article = this.props.article;
    const content = this.props.content ? this.cleanHtml(this.props.content) : this.cleanHtml(article.content.rendered)
    return (
      <div>
        <article>
            <h2>
            <Link to={`${process.env.PUBLIC_URL}/${article.slug}`}>
              <i className="emoji">{article.acf.emoji}</i>
              {article.title.rendered}
              </Link>
            </h2>
          <div className="details">
            <a>{article.acf.category}</a>
            <a>{this.calcTimeToRead()} minute read</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    );
  }
  calcTimeToRead = (e) => {
    let words, imgs = 0

    const wps = 0.218340611, ips = 12

    let el = document.createElement('html')
    el.innerHTML = this.props.article.content.rendered
    imgs = el.querySelectorAll('img').length

    words = htmlToText.fromString(this.props.article.content.rendered).length
    return Math.floor(Math.floor((words * wps + imgs * ips) / 60))
  }
}

export default Article;
