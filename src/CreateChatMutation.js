import {commitMutation, graphql} from 'react-relay'
import {ConnectionHandler} from 'relay-runtime'
import environment from './Environment'

const mutation = graphql`
mutation CreateChatMutation($input: CreateChatInput!){
  createChat(input: $input){
    chat{
      id
      from
      content
      createdAt
    }
  }
}`

export default (from, content, callback) => {
  const variables = {
    input: {
      from,
      content,
      clientMutationId:""
    },
  }

  commitMutation(
    environment,{
      mutation,
      variables,
      onCompleted:() => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}
