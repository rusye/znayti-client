import React, {useEffect} from 'react';
import './Dashboard.css';
import AddCategory from './AddCategory'
import AddAdminUser from './AddAdminUser'

export default function Dashboard() {

  useEffect(
    () => {
      console.log('hello')
      const coll = document.getElementsByClassName('collapsible');

      for (let i = 0; i < coll.length; i++) {
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
    }, []
  )
  
  

  return (
    <section className='Dashboard'>
      <button className='collapsible'>Add Category</button>
      <div className='content'>
        <AddCategory />
      </div>

      <button className='collapsible'>Add Business</button>
      <div className='content'>

      </div>

      <button className='collapsible'>Add Admin User</button>
      <div className='content'>
        <AddAdminUser />
      </div>
    </section>
  );
}