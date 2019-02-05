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
export default (from, content, viewerId,callback) => {
  const variables = {
    input: {
      content:content,
      from:from,
      clientMutationId:""
    },
  }

  commitMutation(
    environment,{
      mutation,
      variables,
      configs: [{
              type: 'RANGE_ADD',
              parentID: viewerId,
              connectionInfo: [{
                key: 'LinkList_allChats',
                rangeBehavior: 'append',
              }],
              edgeName: 'ChatEdge'
            }],

      onCompleted: (response)=>{
        console.log('response: ', response);
        const id = response.createChat.chat.id;
        callback(response);
},

      updater: proxyStore => {
//
//           // storeDebugger.dump(proxyStore)
//
        const payload = proxyStore.getRootField('createChat');
        console.log('updater: payload : ',payload);
        const newReport = payload.getLinkedRecord('chat');
        console.log('updater: newReport : ',newReport);
        const storeRoot = proxyStore.get(viewerId);
        console.log('updater: storeRootss : ',storeRoot);

        // storeRoot.setLinkedRecord()
        console.log('updater: storeRootinggg : ',storeRoot);

        const connection = ConnectionHandler.getConnection(
          storeRoot,
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
        ConnectionHandler.insertEdgeAfter(connection, newEdge);



const newEdgeNode = proxyStore.getRootField('createChat');
// since 'AllPosts' is under Root
const prevPosts = proxyStore.getRoot(viewerId).getLinkedRecord('allChats');
const prevEdgeNodes = prevPosts && prevPosts.getValue('edges');
if (prevEdgeNodes) {
   prevEdgeNodes.push(newEdgeNode);
  // You might want to append or prepend
  prevPosts.setLinkedRecords(prevEdgeNodes, 'edges');
}


        // const newEdge = proxyStore.getRootField('createChat').getLinkedRecord('chat');
        // console.log('updater: newEdge : ',newEdge);
        // if (newEdge) {
        //   if (!viewerId) {
        //     // eslint-disable-next-line
        //     console.log('maybe you forgot to pass a parentId: ');
        //     return;
        //   }
        //   const parentProxy = proxyStore.get(viewerId);
        //   console.log('updater: parentProxy : ',parentProxy);
        //   const connection = ConnectionHandler.getConnection(parentProxy, 'LinkList_allChats', {last: 100, orderBy: 'createdAt_ASC'});
        //   console.log('updater: connection : ',connection);
        //
        //   if (!connection) { // eslint-disable-next-line
        //     console.log('maybe this connection is not in relay store yet:', 'LinkList_allChats');
        //      return;
        //    }
        //         ConnectionHandler.insertEdgeAfter(connection, newEdge);
        //
        //     }

},
  // console.log('one:',prevPosts)

      onError: err => console.error(err),
    },
  )
}
