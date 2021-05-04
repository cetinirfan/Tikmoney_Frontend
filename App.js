import React, { Component } from 'react';
import  MyStack from './Router';
import { Provider } from 'mobx-react';
import store from './src/store/index';

export default class App extends Component {
  render() {
    return (
      <Provider {...store}>
        <MyStack/>
      </Provider>
    );
  }
}