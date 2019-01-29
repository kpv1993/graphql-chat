import React, {Component} from 'react'
import CreateChatMutation from './CreateChatMutation'

class  CreateChat extends Component {
  state = {
    from:'',
    content:''
  }

  render() {

    return (

      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.from}
            onChange={(e) => this.setState({ from: e.target.value })}
            type='text'
            placeholder='From'
          />
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
    )

  }

  _createLink = () => {
    const {from, content} = this.state
    CreateChatMutation(from, content, () => console.log('Mutation completed'))
  }
}

export default CreateChat
