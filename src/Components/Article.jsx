import React, { Component } from "react";
import { Link } from "react-router-dom";
import htmlToText from "html-to-text";
import sanitizeHtml from "sanitize-html";

class Article extends Component {
  cleanHtml = html => {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "b",
        "i",
        "em"
      ])
    });
  };
  render() {
    const article = this.props.article;
    const content = this.props.content
      ? this.cleanHtml(this.props.content)
      : this.cleanHtml(article.content.rendered);
    return (
      <div>
        <article>
          <div className="article__top-details">
            <Link to={`${process.env.PUBLIC_URL}/${article.acf.category}`}>{article.acf.category}</Link>
          </div>
          <h2>
            <Link to={`${process.env.PUBLIC_URL}/${article.slug}`}>
              <i className="emoji">{article.acf.emoji}</i>
              {article.title.rendered}
            </Link>
          </h2>
          <div className="article__bottom-details">
            <a className="details__datetime">{this.calcDateTime(article.date)}</a>
            <a>{this.calcTimeToRead()} minute read</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
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
    console.log('month', date.getMonth())
    console.log('year', date.getFullYear())
    console.log('day', date.getDate())

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const now = new Date()

    if (now.getFullYear() ==! date.getFullYear()) {
      dateStr = months[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear()
    } else if(now.getFullYear() == date.getFullYear() && now.getMonth() == date.getMonth() && now.getDate() == date.getDate() ) {
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
