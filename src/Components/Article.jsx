import React, {Component} from 'react';

class Article extends Component {
    constructor(props) {
      super(props)
      this.state = {
        modifierClass: '',
        style: null
      }
    }
  
    handleClick = (e) => {
      if(this.props.type !== 'solo') {
        this.props.handleClick(e, this.props.id)
      }
    }
  
    render() {
      return(
        <div>
        <article className={this.props.type} style={this.state.style}>
              <h2 onClick={this.handleClick}><i className="emoji">{this.props.emoji}</i><a>{this.props.title}</a></h2>
          <div className="details">
              <a>{this.props.cat}</a>
              <a>3 minute read</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: this.props.content }}></div>
        </article>
        <div className='articleSpacer' style={this.state.spacerStyle}></div>
        </div>
      )
    }
  }
  

  export default Article