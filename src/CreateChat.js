import React, {Component} from 'react'
import CreateChatMutation from './CreateChatMutation'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from './Environment'
import LinkList from './LinkList'
import Link from './Link'
import NewChatSubscription from './NewChatSubscription'

const CreateChatQuery = graphql`
query CreateChatQuery {
  viewer {
    ...LinkList_viewer
  }
}
`
var refetching = true;

class  CreateChat extends Component {
  state = {
    from:'',
    content:''
  }

  componentDidMount() {
    // Get username form prompt
    // when page loads
    // const {froms, content} = this.state
    const from = window.prompt('username');
    from && this.setState({ from });
    NewChatSubscription()
  }

  render() {

    return (
<div>
<div>
      <QueryRenderer
        environment={environment}
        query={CreateChatQuery}
        variables={{refetch: refetching}}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <LinkList viewer={props.viewer} />
          }
          return <div>Loading</div>
        }}
      />
      </div>

      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
            type='text'
            placeholder='Message'
          />
        </div>
        <div
          className='button'
          onClick={() => this._createLink()}>
          submit
        </div>
      </div>
      </div>
    )

  }

  _createLink = () => {
    const {from, content} = this.state
    CreateChatMutation(from, content, (response)=>
    {refetching = false;
    })

  }
}



export default CreateChat
