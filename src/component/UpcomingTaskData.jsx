import React from 'react'

const UpcomingTaskData = (props) => {
    
    return (
        <div className="task">
            <input className="task-item" name="task" type="checkbox" id={props?.taskId} />
            <label htmlFor={props?.taskId}>
                <span className="label-text ">{props.description}</span>
            </label>
            <span className={props.status ? "tag completed" : "tag pending"}>{props.status ? "pending" : "pending"}</span>
        </div>
    )
}

export default UpcomingTaskData
