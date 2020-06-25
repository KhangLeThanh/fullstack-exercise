const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_MESSAGE':   
            return action.noti;
        case 'REMOVE_MESSAGE':            
          return ''
        default:
          return state
    }
}
  
export const displayMessage = (message, time) => {
    return  dispatch => {
        dispatch({
          type: 'SET_MESSAGE',
          noti:message
        })
        setTimeout(() =>
            {
                dispatch({
                    type: 'REMOVE_MESSAGE'
                })
            }, time
        )
    }
   
}
export const hideMessage =  () => {
    
    return {
        type: 'REMOVE_MESSAGE',
    }
}
export default notificationReducer