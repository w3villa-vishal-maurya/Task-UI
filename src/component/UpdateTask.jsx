import AuthContext from '../context/AuthProvider';
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import axios from '../api/axios';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';




const UpdateTask = () => {
    const errRef = useRef();
    const descriptionRef = useRef();
    const completedRef = useRef();


    const navigate = useNavigate();
    const location = useLocation();
    const from = "/all-task";
    const { auth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [task, setTask] = useState();
    const [completed, setCompleted] = useState(false);

    // const task = location.state?.task;

    const path = location.pathname.split('/');
    const taskId = path[2];


    useEffect(() => {
        initMDB({ Dropdown, Collapse });

        async function getTaskWithId() {
            try {

                const TASK_WITH_ID = `/task/${taskId}`;

                const response = await axios.get(TASK_WITH_ID,
                    {
                        headers: { Authorization: auth.accessToken }
                    }
                );
                
                setTask(response?.data?.Task[0]?.description);
                setCompleted(response?.data?.Task[0]?.completed)
            }
            catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('Task not found....');
                    navigate(from, { replace: true });
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                }
                else {
                    setErrMsg('You are not login, Login first...');
                }
            }

        }

        getTaskWithId()
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const UPDATE_TASK = `/task/${taskId}`;

            await axios.put(UPDATE_TASK, {
                "description": task,
                "completed": completed
            },
                {
                    headers: { Authorization: auth.accessToken }
                }
            );

            alert("Task has been Updated!!");
            // navigate(from, { replace: true });
            navigate("/all-task")
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            }
            else if (err.response?.status === 400) {
                setErrMsg('Updated task not submitted!!');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautherized');
            }
            else {
                setErrMsg('You are not login, Login first...');
            }

            // errRef.current.focus();
        }
    }

    return (
        <>
            <div class="page-content row  d-flex  align-items-center h-100">
                <section className='col-4 d-flex justify-content-center align-items-center'>
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive' >
                        {errMsg}
                    </p>
                </section>

                <div class="header col-4 d-flex justify-content-center align-items-center" >Update Task </div>
                <div className='col-4'>

                    <form onSubmit={handleSubmit} class="row d-flex justify-content-center align-items-center">
                        <div className="mb-3">
                            <label
                                className="form-label">
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                name="task"
                                ref={descriptionRef}
                                onChange={(e) => setTask(e.target.value)}
                                // defaultValue={task?.description}
                                value={task}
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                id="html"
                                type="checkbox"
                                // defaultChecked={completed}
                                checked={completed}
                                ref={completedRef}
                                onChange={(e) => setCompleted(e.target.checked)}
                                value={completed}
                            />
                            <label for="html"> 	&ensp;Completed </label>
                        </div>
                        <button className='col-4 btn btn-primary btn-lg btn-block'
                            type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateTask
