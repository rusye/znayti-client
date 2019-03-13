import React, {useState, useEffect} from 'react';

export default function HourInput(props) {
  const [open, setOpen] = useState('')
  const [close, setClose] = useState('')

  const handleUpdate = () => {
    if (open === '' || close === '') {
      props.onChange(props.name, 'closed')
    } else {
      props.onChange(props.name, `open ${open} close ${close}`)
    }
  }

  useEffect(
    () => {
      handleUpdate()
    }, [open, close]
  )

  return (
    <legend>{props.name}
      <label aria-label='select-open-time'>Open
        <input 
          type='time' 
          value={open} 
          onChange={e => setOpen(e.target.value)} 
          name='open-time'
          title='Please enter open time'
          aria-labelledby='open-time'
        />
      </label>

      <label aria-label='select-close-time'>Close
        <input 
          type='time' 
          value={close} 
          onChange={e => setClose(e.target.value)} 
          name='close-time'
          title='Please enter close time'
          aria-labelledby='close-time'
        />
      </label>
    </legend>
  );
}