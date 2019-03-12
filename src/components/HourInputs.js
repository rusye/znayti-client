import React, {useState} from 'react';

export default function HourInput(props) {
  const [open, setOpen] = useState('')
  const [close, setClose] = useState('')

  return (
    <legend>
      <label aria-label='select-open-time'>Open
        <input 
          id='open' 
          type='time' 
          value={open} 
          onChange={e => setOpen(e.target.value)} 
          name='open-time'
          title='Please enter open time'
          aria-labelledby='open-time'
          required
        />
      </label>

      <label aria-label='select-close-time'>Close
        <input 
          id='close' 
          type='time' 
          value={close} 
          onChange={e => setClose(e.target.value)} 
          name='close-time'
          title='Please enter close time'
          aria-labelledby='close-time'
          required
        />
      </label>
    </legend>
  );
}