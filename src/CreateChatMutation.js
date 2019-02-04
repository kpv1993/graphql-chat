import {commitMutation, graphql} from 'react-relay'
import {ConnectionHandler} from 'relay-runtime'
import environment from './Environment'
import LinkList from './LinkList'
// import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger'

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

let temp =0
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

      onCompleted: (response)=>{
        console.log('response: ', response);
        const id = response.createChat.chat.id;
        callback(response);
},

      // optimisticUpdater: proxyStore => {
        // 1 - create the `newPost` as a mock that can be added to the store
//     const ids = 'client:newChat:' + temp++
//     const newPost = proxyStore.create(ids, 'Chat')
//     newPost.setValue(ids, 'id')
//     newPost.setValue(from, 'from')
//     newPost.setValue(content, 'content')
//   // 2 - add `newPost` to the store
//     const viewerProxy = proxyStore.getRoot()
//     const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allChats', {
//   last: 100,
//   orderBy: 'createdAt_ASC'
// })
//     if (connection) {
//       ConnectionHandler.insertEdgeAfter(connection, newPost)
//     }
      // },
      updater: proxyStore => {
//
//           // storeDebugger.dump(proxyStore)
//
        const payload = proxyStore.getRootField('createChat');
        console.log('updater: payload : ',payload);
        const newReport = payload.getLinkedRecord('chat');
        console.log('updater: newReport : ',newReport);
        const storeRoot = proxyStore.getRoot();
        console.log('updater: storeRootss : ',storeRoot);
        // storeRoot.setValue(payload.getLinkedRecord('chat').getValue('from'), from);
        // storeRoot.setLinkedRecord()
        // console.log('updater: storeRootinggg : ',storeRoot);
        const connection = ConnectionHandler.getConnection(
          payload,
          'LinkList_allChats'
        );
        console.log('updater: connection : ',connection);
        const newEdge = ConnectionHandler.createEdge(
          proxyStore,
          connection,
          payload,
          'ChatEdge'
        );
        console.log('updater: newEdge : ',newEdge);
        ConnectionHandler.insertEdgeBefore(connection, newEdge);
//   //       const newEdgeNode = proxyStore.getRootField('createChat');
//   //       console.log('updater: newEdgeNode : ',newEdgeNode);
//   // // since 'AllPosts' is under Root
//   // const prevPosts = proxyStore.getRoot().getLinkedRecord('chat');
//   // console.log('updater: prevPosts : ',prevPosts);
//   // const prevEdgeNodes = prevPosts && prevPosts.getLinkedRecords('edges');
//   // console.log('updater: prevEdgeNodes : ',prevEdgeNodes);
//   //
//   // if (prevEdgeNodes) {
//   //   prevEdgeNodes.push(newEdgeNode); // You might want to append or prepend
//   //   prevPosts.setLinkedRecords(prevEdgeNodes, 'edges');
//   // }
},
  // console.log('one:',prevPosts)

      onError: err => console.error(err),
    },
  )
}
