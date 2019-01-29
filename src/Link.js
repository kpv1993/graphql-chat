import React, { Component } from 'react'
import {createFragmentContainer, graphql} from 'react-relay'

class Link extends Component {
  render(){
    return(
      <div>
        <div>{this.props.link.from} ({this.props.link.content})</div>
      </div>
    )
  }



}

export default createFragmentContainer(Link, graphql`
fragment Link_link on Chat{
  from
  content
}`)
