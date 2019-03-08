import React, {useState} from 'react';
import './Dashboard.css';
import AddCategory from './AddCategory'

export default function Dashboard() {
  
  const coll = document.getElementsByClassName('collapsible');
  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
      this.classList.toggle('active');
      let content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      } 
    });
  }

  return (
    <section className='Dashboard'>
      <button className='collapsible'>Add Category</button>
      <div className='content'>
        <AddCategory />
      </div>

      <button className='collapsible'>Add Business</button>
      <div className='content'><h2>Add Business</h2></div>

      <button className='collapsible'>Add Admin User</button>
      <div className='content'><h2>Add Admin User</h2></div>
    </section>
  );
}