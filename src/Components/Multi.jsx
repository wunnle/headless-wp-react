import React, {Component} from 'react';
import Article from './Article'


class Multi extends Component {
    handleArticleClick = (e, id) => {
        this.props.handleArticleClick(e, id)
    }
    getExcerpt = (content) => {
        let el = document.createElement('html')
        el.innerHTML = content
        console.log(el)
        if(el.querySelector('p') !== null) {
            return ('<p>' + el.querySelector('p').innerHTML + '</p>')
        }
    }
    render() {
        return (
            <div className="multi-article">
                {this.props.articles.map(article => 
                    <Article key={article.id} article={article} content={this.getExcerpt(article.content.rendered)}/>
                )}
            </div>
        )
    }
}

export default Multi

