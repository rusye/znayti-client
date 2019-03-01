import React, { Component } from 'react';
import './Categories.css';
import Search from './Search';

class Categories extends Component {

    // 4. Get request for backend data

  render() {
    return (
      <div className='categories'>
        <Search />
      </div>
    );
  }
}

export default Categories;