import React, {Component} from 'react'
import {
  requestSubscription,
  graphql
} from 'react-relay'
import {ConnectionHandler} from 'relay-runtime';
import environment from './Environment'
import CreateChatMutation from './CreateChatMutation'
import LinkList from './LinkList'

const newChatSubscription = graphql`
  subscription NewChatSubscription {
    # 1
    Chat (filter: {
      mutation_in: [CREATED]
    }) {
      # 2
      node {
        id
        from
        content
        createdAt
      }
    }
  }
`

function sharedUpdater(store, user, newEdge) {
  // Get the current user record from the store
  const userProxy = store.get(user.id);

  // Get the user's Todo List using ConnectionHandler helper
  const conn = ConnectionHandler.getConnection(
    userProxy,
    'LinkList_allChats', // This is the connection identifier, defined here
    // https://github.com/relayjs/relay-examples/blob/master/todo/js/components/TodoList.js#L68
  );

  // Insert the new todo into the Todo List connection
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
}

export default () => {

  const subscriptionConfig = {
    subscription: newChatSubscription,
    variables: {},
    updater: proxyStore => {
      // const createChatField = proxyStore.getRootField('Chat')
      // const cc = createChatField.getLinkedRecord('node')
      // const newChat = cc.getOrCreateLinkedRecord(from, content)
      // const id = newChat.getLinkedRecord('id')
      // const p = newChat.getLinkedRecord('content')
      // console.log(`p value:`, p)
      //
      // sharedUpdater(proxyStore,user, newChat)
      const newEdgeNode = proxyStore.getRootField('createChat');
// since 'AllPosts' is under Root
const prevPosts = proxyStore.getRoot().getLinkedRecord('chat');
const prevEdgeNodes = prevPosts && prevPosts.getValue('edges');
if (prevEdgeNodes) {
  prevEdgeNodes.push(newEdgeNode); // You might want to append or prepend
  prevPosts.setLinkedRecords(prevEdgeNodes, 'edges');
    }
  },
    onError: error => console.log(`An error occured:`, error)
  }

  requestSubscription(
    environment,
    subscriptionConfig
  )

}
