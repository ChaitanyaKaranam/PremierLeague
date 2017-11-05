import React, { Component } from 'react';
import Results from './results';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-white bg-dark">
          <h2>Premier League</h2>
        </div>
        <Results/>
      </div>
    );
  }
}
