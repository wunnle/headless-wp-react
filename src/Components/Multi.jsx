import React, {Component} from 'react';
import FakeArticle from './FakeArticle'


class Multi extends Component {
    handleArticleClick = (e, id) => {
        this.props.handleArticleClick(e, id)
    }
    getExcerpt = (content) => {
        let el = document.createElement('html')
        el.innerHTML = content
        return ('<p>' + el.querySelector('p').innerHTML + '</p>')
    }
    render() {
        return (
            <div>
                {this.props.articles.map(article => 
                    <FakeArticle key={article.id} article={article} content={this.getExcerpt(article.content.rendered)}/>
                )}
            </div>
        )
    }
}

export default Multi

