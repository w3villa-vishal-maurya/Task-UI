import React, { useEffect, useRef, useState, useContext } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Task from './Task';

const CREATE_TASK = "/task/createnew"

const CreateTask = () => {
    const errRef = useRef();

    const { auth, setCurrentComponent, isLogin } = useContext(AuthContext);
    const descriptionRef = useRef();

    const [description, setDescription] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const from = "/";
    const loginFrom = "/login"

    useEffect(() => {
        if (!isLogin) {
            navigate(loginFrom, { replace: true });
        }
        else {
            initMDB({ Dropdown, Collapse });
            descriptionRef.current.focus();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [description]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(CREATE_TASK, { "description": description },
                {
                    headers: { Authorization: auth.accessToken }
                }
            );

            alert(response.data.message);
            navigate(from, { replace: true });
            setCurrentComponent(<Task />)
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

                <div class="header col-4 d-flex justify-content-center align-items-center" >Create New Task </div>
                <div className='col-4'>

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
                                ref={descriptionRef}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                placeholder="Task"
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
        </>
    )
}

export default CreateTask
