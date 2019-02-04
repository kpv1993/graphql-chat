import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LinkList from './LinkList'
import LinkListPage from './LinkListPage'
import CreateChat from './CreateChat'
import NewChatSubscription from './NewChatSubscription'

class App extends Component {
  render() {
    return (
      <CreateChat/>
    );
  }
}

export default App;
