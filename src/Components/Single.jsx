import React, {Component} from 'react';
import Article from './Article'

class Single extends Component {
    render() {
        const article = this.props.article
        return (
            <div class='solo'>
                <Article type={'solo'} id={article.id} handleClick={this.handleArticleClick} key={article.id} title={article.title.rendered} content={article.content.rendered} cat={article.acf.category} emoji={article.acf.emoji} />
            </div>
        )
    }
}

export default Single

