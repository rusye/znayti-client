import React from 'react';
import './HomePage.css';
import Search from './Search'

export default function HomePage(props) {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>
          Znayti - Connecting Russian speakers with Russian speaking businesses 
        </h1>
      </header>

      <main role='main'>
        <Search {...props} />
      </main>
    </div>
  );
}