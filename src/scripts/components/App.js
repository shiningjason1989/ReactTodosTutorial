import React from 'react';
import Header from './Header';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header username="Jason" todoNumber={100} />
      </div>
    );
  }
}
