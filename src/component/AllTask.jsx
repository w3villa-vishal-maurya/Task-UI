import React, { useState, useContext } from 'react';
import axios from "../api/axios"
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';



const AllTask = (props) => {
    const { auth} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();


    const handleUpdateTask = () => {
        const task = {
            description: props.description,
            completed: props?.status ? true : false,
            taskId: props.taskId
        }

        // setCurrentComponent(<UpdateTask task={task} />)
        navigate(`${"/update-task"}#${props.taskId}`, { state: { task } });
    };



    const handleDeleteTask = async () => {
        try {

            const DELETE_TASK = `/task/${props?.taskId}`

            const response = await axios.delete(DELETE_TASK, {
                headers: { Authorization: auth.accessToken }
            });

            // Set the response data in state
            // console.log(response.data);
            if (response?.data?.title === "Successfull") {
                props.setIsDeletedData(response);
                alert(response?.data?.message);
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');

            }
            else if (err.response?.status === 400) {
                setErrMsg('You have not any current task yet...');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');

            }
            else if (err.response?.status === 403) {
                setErrMsg('User is not logged In');
            }
            else {
                setErrMsg('Login failed');
            }
        }
    }

    return (
        <>
            { errMsg ? <p>{errMsg}</p> : ''}
            <div className="task">
                <input
                    className="task-item"
                    name="task"
                    type="checkbox"
                    checked={props.status}
                />
                <label htmlFor={props?.taskId}>
                    <span className="label-text ">{props?.description}</span>
                </label>
                <span id={props?.taskId}>
                    <span className="tag" onClick={handleUpdateTask}><img className="feather feather-edit" src="svg/edit.svg" alt="" /></span>
                    <span className="tag tag-delete" onClick={handleDeleteTask}> <img className="feather feather-trash delete" src="svg/trash.svg" alt="" /></span>
                </span>
            </div>
        </>
    )
}

export default AllTask
