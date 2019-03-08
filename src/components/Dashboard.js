import React from 'react';
import './Dashboard.css';


export default function Dashboard() {

  const coll = document.getElementsByClassName('collapsible');
  let i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function() {
      this.classList.toggle('active');
      let content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  }

  return (
    <section className='Dashboard'>
      <button className='collapsible'>Add A Category</button>
      <div className='content'><h2>Add A Category</h2></div>

      <button className='collapsible'>Add A Business</button>
      <div className='content'><h2>Add A Business</h2></div>

      <button className='collapsible'>Add A Admin User</button>
      <div className='content'><h2>Add A Admin User</h2></div>
    </section>
  );
}