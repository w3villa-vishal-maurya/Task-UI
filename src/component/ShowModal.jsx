import React, { useRef, useState, useContext } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useLocation } from 'react-router-dom';

const CREATE_PROJETC_TASK = "/project/create-project-task"

const ShowModal = ({ closeModal }) => {
    const { auth } = useContext(AuthContext);
    const taskNameRef = useRef();
    const taskDescriptionRef = useRef();
    const [errMsg, setErrMsg] = useState('');


    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    window.onclick = function (event) {
        if (event.target.id === "modal-1") {
            closeModal();
        }
    }


    const location = useLocation();


    const path = location.pathname.split('/');
    const projectId = path[2];

    const handleSubmit = async (e) => {
        e.preventDefault();
        initMDB({ Dropdown, Collapse });

        try {
            const response = await axios.post(CREATE_PROJETC_TASK, {
                projectId: projectId,
                taskName: taskName,
                taskDescription: taskDescription
            },
                {
                    headers: { Authorization: auth.accessToken }
                }
            );

            alert(response.data.message);

            closeModal();
            setErrMsg("");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Please create a task...');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('You are not login, Login first...');
            }

            console.log(errMsg);
        }
    }

    return (
        <>
            <div className='modal-wrapper' id='modal-1'></div>
            <div className='modal-container'>
                <div class="page-content  d-flex  align-items-center h-100">

                    <div class="header col-12 d-flex justify-content-center align-items-center" >Create New Task </div>
                    <div className='col-12'>

                        <form onSubmit={handleSubmit} class="row d-flex justify-content-center align-items-center">
                            <div className="mb-3">
                                <label
                                    className="form-label">
                                    {/* Create Task */}
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    ref={taskNameRef}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    value={taskName}
                                    placeholder="Task"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    className="form-label">
                                    {/* Create Task */}
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="description"
                                    ref={taskDescriptionRef}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    value={taskDescription}
                                    placeholder="Description"
                                    required
                                />
                            </div>


                            <button className='col-4 btn btn-primary btn-lg btn-block'
                                type="submit">
                                Create
                            </button>
                        </form>

                        {/* Display the response */}
                        {/* {response && <p>{response}</p>} */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowModal
