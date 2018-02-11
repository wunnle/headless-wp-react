import React, {Component} from 'react';
import Article from './Article'
import sanitizeHtml from 'sanitize-html'


class Multi extends Component {
    handleArticleClick = (e, id) => {
        this.props.handleArticleClick(e, id)
    }
    getExcerpt = (content) => {
        let el = document.createElement('html')
        el.innerHTML = content
        return sanitizeHtml('<p>' + el.querySelector('p').innerHTML + '</p>')
    }
    render() {
        return (
            <div>
                {this.props.articles.map(article => 
                    <Article id={article.id} handleClick={this.handleArticleClick} key={article.id} title={article.title.rendered} content={this.getExcerpt(article.content.rendered)} cat={article.acf.category} emoji={article.acf.emoji} />
                )}
            </div>
        )
    }
}

export default Multi

