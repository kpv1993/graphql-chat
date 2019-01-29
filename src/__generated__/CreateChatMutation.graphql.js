/**
 * @flow
 * @relayHash d7c7d8d53eff33993a22e554d9eb9479
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateChatInput = {|
  content?: ?string,
  from?: ?string,
  clientMutationId?: ?string,
|};
export type CreateChatMutationVariables = {|
  input: CreateChatInput
|};
export type CreateChatMutationResponse = {|
  +createChat: ?{|
    +chat: ?{|
      +id: ?string,
      +from: ?string,
      +content: ?string,
      +createdAt: ?any,
    |}
  |}
|};
export type CreateChatMutation = {|
  variables: CreateChatMutationVariables,
  response: CreateChatMutationResponse,
|};
*/


/*
mutation CreateChatMutation(
  $input: CreateChatInput!
) {
  createChat(input: $input) {
    chat {
      id
      from
      content
      createdAt
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateChatInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "createChat",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input",
        "type": "CreateChatInput"
      }
    ],
    "concreteType": "CreateChatPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "chat",
        "storageKey": null,
        "args": null,
        "concreteType": "Chat",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "from",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "content",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "createdAt",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CreateChatMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateChatMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateChatMutation",
    "id": null,
    "text": "mutation CreateChatMutation(\n  $input: CreateChatInput!\n) {\n  createChat(input: $input) {\n    chat {\n      id\n      from\n      content\n      createdAt\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '214c37c3b0e7e78693bac72a011a1a30';
module.exports = node;
