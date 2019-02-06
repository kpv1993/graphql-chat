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

    Chat (filter: {
      mutation_in: [CREATED]
    }) {

      node {
        id
        from
        content
        createdAt
      }
    }
  }
`

export default (viewerId) => {

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
//       const newEdgeNode = proxyStore.getRootField('createChat');
// // since 'AllPosts' is under Root
// const prevPosts = proxyStore.getRoot().getLinkedRecord('chat');
// const prevEdgeNodes = prevPosts && prevPosts.getValue('edges');
// if (prevEdgeNodes) {
//   prevEdgeNodes.push(newEdgeNode); // You might want to append or prepend
//   prevPosts.setLinkedRecords(prevEdgeNodes, 'edges');
//     }
//   },
//     onError: error => console.log(`An error occured:`, error)
//   }

      const createVoteField = proxyStore.getRootField('Chat')
      console.log('updaterSub: createVoteField : ',createVoteField);
      const newVote = createVoteField.getLinkedRecord('node')
      console.log('updaterSub: newVote : ',newVote);

      const link = proxyStore.get(viewerId)
      console.log('updaterSub: link : ',link);
      const connection = ConnectionHandler.getConnection(
        link,
        'LinkList_allChats'
      );
      // console.log('updaterSub: connection : ',connection);
      const newEdge = ConnectionHandler.createEdge(
        proxyStore,
        connection,
        newVote,
        'ChatEdge'
      );
      console.log('updaterSub: newEdge : ',newEdge);
      ConnectionHandler.insertEdgeAfter(connection, newEdge);
    },
    onError: error => console.log(`An error occured:`, error)
  }

  requestSubscription(
    environment,
    subscriptionConfig
  )
}
