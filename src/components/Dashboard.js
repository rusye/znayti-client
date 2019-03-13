import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from '../functions/normalizeResponse';
import './Dashboard.css';
import AddCategory from './AddCategory'
import AddAdminUser from './AddAdminUser'
import AddBusiness from './AddBusiness'

export default function Dashboard() {
  const [categories, setCategories] = useState('')
  const [serverMessage, setServerMessage] = useState(null);

  const fetchCategories = () => {
    return fetch(`${API_BASE_URL}/categories`, {
        method: 'GET'
      })
      .then(res => normalizeResponseErrors(res))
      .then(res => {
        return res.json();
      })
      .then(rcvdCategories => {
        console.log('i Made a fetch')
        setServerMessage(null)
        if (rcvdCategories.length > 0) {
          setCategories(rcvdCategories)
        }
      })
      .catch(err => {
        setServerMessage('Unable to connect to server')
      })
  }

  const updateCategories = (newCategory) => {
    setCategories([...categories, newCategory])
  }

  useEffect(
    () => {
      fetchCategories()
    }, []
  )

  const collapsible = () => {
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
  }

  useEffect(
    () => {
      collapsible()
    }, []
  )

  return (
    !localStorage.loggedIn ? (
        <Redirect to='/bigboss/login' /> 
    ) : (
      <section className='Dashboard'>
        <button className='collapsible'>Add Category</button>
        <div className='content'>
          <fieldset>
            <legend>Add New Category</legend>
            <AddCategory updateCategories={updateCategories}/>
          </fieldset>
        </div>

        <button className='collapsible'>Add Business</button>
        <div className='content'>
          <fieldset>
            <legend>Add New Business</legend>
            <AddBusiness categories={categories}/>
          </fieldset>
        </div>

        <button className='collapsible'>Add Admin User</button>
        <div className='content'>
          <fieldset>
            <legend>Add New Admin</legend>
            <AddAdminUser />
          </fieldset>
        </div>

        {serverMessage}
      </section>
    ) 
  );
}