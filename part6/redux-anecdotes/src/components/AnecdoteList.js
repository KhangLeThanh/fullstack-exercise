import React from 'react'
import { connect } from 'react-redux' 

import { 
    addVote
  } from '../reducers/anecdoteReducer' 
  import { displayMessage } from '../reducers/notificationReducer'

const Ancedote = ({ dote, handleClick }) => {
  return(
    <div>
        <p>
            {dote.content}
        <br></br>
            has {dote.votes}
            <button onClick={handleClick}>vote</button>
        </p>
  </div>
  )
}

const AnecdoteList = (props) => {
  
  props.anecdote.sort(function(a,b) {
    return b.votes - a.votes
  });
  const upVote = async (data) => {
    props.addVote(data)
  }
  return(
    <div>
      {props.anecdote.map(dote =>
        <Ancedote
          key={dote.id}
          dote={dote}
          handleClick={() =>{ 
            upVote(dote)
                props.displayMessage(`you voted '${dote.content}'`, 1000)
            
          }
        }
        />
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
    console.log(state.filter)
        if(state.filter.length === 0){
            return {anecdote: state.anecdote}
        }  
        else{
            const lowercasedFilter = state.filter.toLowerCase();
            return {anecdote:state.anecdote.filter(item => item.content.includes(lowercasedFilter))}
        }
    
   
}
const mapDispatchToProps = {
    addVote,
    displayMessage
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)
