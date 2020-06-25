import React from 'react'
import { connect } from 'react-redux' 

import { createDote } from '../reducers/anecdoteReducer'
import { displayMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addDote = async (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    event.target.dote.value = ''
    props.createDote(content)
    props.displayMessage(`you voted '${content}'`, 1000)
  
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addDote}>
        <div><input name="dote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
    createDote,
    displayMessage
}
export default connect(
    null,
    mapDispatchToProps
  )(AnecdoteForm)