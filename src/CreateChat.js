import React, {Component} from 'react'
import { ROOT_ID } from 'relay-runtime';
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
    id
    ...LinkList_viewer
  }
}
`
var refetching = true;
var viewerId = null;

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
    // NewChatSubscription()
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
            return(
              <div>
              <div>
              <LinkList viewer={props.viewer} />
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
                  onClick={() => this._createLink(props.viewer.id)}>
                  submit
                </div>
              </div>
              </div>
            )
            // <LinkList viewer={props.viewer} />
          }
          return <div>Loading</div>
        }}
      />
      </div>


      </div>
    )

  }

  _createLink = (ids) => {
    const {from, content} = this.state
    console.log('from and content: ',from);
    CreateChatMutation(from, content,ids, (response)=>
    {refetching = false;
    })

  }
}



export default CreateChat
