import React from 'react'

const Notification = ({ success_message, error_message }) => {
    console.log(success_message)
    
    return (
        <div>
            {success_message !== null ?
            <div className="success">
                {success_message}

            </div>
            :
            <div></div>}
            {error_message !== null ?
            <div className="error">
                {error_message}

            </div>
            :
            <div></div>}
        </div>
    )
}
export default Notification
