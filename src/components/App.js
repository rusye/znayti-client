import React, { Component } from 'react';
import './App.css';
import Search from './Search'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>
            Znayti - Connecting Russian speakers with Russian speaking businesses 
          </h1>
        </header>

        <main role='main'>
          <div className='search'>
            <Search />
          </div>
        </main>
      </div>
    );
  }
}

export default App;