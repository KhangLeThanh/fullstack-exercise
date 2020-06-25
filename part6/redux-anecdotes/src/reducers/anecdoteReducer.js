
import doteService from '../services/dotes'

const anecdoteReducer = (state = [], action) => {

  switch(action.type){
    case 'INIT_DOTE':
      return action.data
    case 'CREATE_DOTE':
      return [...state, action.data]

    case 'ADD_VOTE':
      const id = action.data.id
      const doteToChange = state.find(n => n.id === id)
      const changedDote = { 
        ...doteToChange, 
        votes: doteToChange.votes + 1
      }

      return state.map(dote =>
        dote.id !== id ? dote : changedDote 
      )

    default:
      return state

  }
}

export const initializeDote = () => {
  return async dispatch => {
    const dotes = await doteService.getAll()
    dispatch({
      type: 'INIT_DOTE',
      data: dotes,
    })
  }
  
}

export const createDote = (content) => {
  return async dispatch => {
    const newDote = await doteService.createNew(content)
    dispatch({
      type: 'CREATE_DOTE',
      data: newDote,
    })
  }
  
}
export const addVote = (dote) => {
  return async dispatch => {
    const updatedDote = await doteService.updateVote(dote.id,{
      content: dote.content,votes: dote.votes + 1
    })
    dispatch({
      type: 'ADD_VOTE',
      data: updatedDote,
    })
  }
 
}

export default anecdoteReducer