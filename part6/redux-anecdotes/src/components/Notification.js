import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
 
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = useSelector(({message})=>{
    return( 
    message.length > 0 ?
      <p style={style}>{message}</p>
      :
      <div></div>
    )
    })
  return (
    <div>
      {notification}
    </div>
  )
}

export default Notification