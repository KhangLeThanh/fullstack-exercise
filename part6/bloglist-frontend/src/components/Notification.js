import React from 'react'

const Notification = ({ success_message, error_message }) => {    

    return (
        <div>

            {success_message?
                <p className="success">{success_message}</p>

            :
            <div></div>}
             {error_message?
                <p className="success">{error_message}</p>

            :
            <div></div>}
        </div>
    )
}
export default Notification
