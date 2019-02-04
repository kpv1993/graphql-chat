/**
 * @flow
 * @relayHash 42a90e8253664b2ed7297c4645720b21
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type NewChatSubscriptionVariables = {||};
export type NewChatSubscriptionResponse = {|
  +Chat: ?{|
    +node: ?{|
      +id: ?string,
      +from: ?string,
      +content: ?string,
      +createdAt: ?any,
    |}
  |}
|};
export type NewChatSubscription = {|
  variables: NewChatSubscriptionVariables,
  response: NewChatSubscriptionResponse,
|};
*/


/*
subscription NewChatSubscription {
  Chat(filter: {mutation_in: [CREATED]}) {
    node {
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
    "kind": "LinkedField",
    "alias": null,
    "name": "Chat",
    "storageKey": "Chat(filter:{\"mutation_in\":[\"CREATED\"]})",
    "args": [
      {
        "kind": "Literal",
        "name": "filter",
        "value": {
          "mutation_in": [
            "CREATED"
          ]
        },
        "type": "ChatSubscriptionFilter"
      }
    ],
    "concreteType": "ChatSubscriptionPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
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
    "name": "NewChatSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "NewChatSubscription",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "subscription",
    "name": "NewChatSubscription",
    "id": null,
    "text": "subscription NewChatSubscription {\n  Chat(filter: {mutation_in: [CREATED]}) {\n    node {\n      id\n      from\n      content\n      createdAt\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'c54023f4871b3797d1fc2dc700889b0c';
module.exports = node;
