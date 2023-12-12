import React, { useState, useContext, useEffect } from 'react';
import axios from "../api/axios"
import AuthContext from '../context/AuthProvider';
import AllTask from './AllTask';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";

const SHOWALL_TASK = "/task/showall"

const Task = () => {
    const { auth, isLogin } = useContext(AuthContext);
    const loginFrom = "/login";
    const navigate = useNavigate();

    const [allTaskData, setAllTaskData] = useState([]);
    const [isDeletedData, setIsDeletedData] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        async function getAllData() {
            try {
                initMDB({ Dropdown, Collapse });
                const response = await axios.get(SHOWALL_TASK, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                if (response?.data?.Task) {
                    setAllTaskData(response?.data?.Task);
                }
                else {
                    setAllTaskData([]);
                    setErrMsg('You have not any current task yet...');
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 400) {
                    setErrMsg('You have not any current task yet...');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unautherized');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 403) {
                    setErrMsg('User is not logged In');
                    navigate(loginFrom, { replace: true });
                }
                else {
                    setErrMsg('Login failed');
                }

                // errRef.current.focus();
            }
        }

        if (!isLogin) {
            navigate(loginFrom, { replace: true });
        }
        else {
            getAllData();
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeletedData, setErrMsg])

    return (
        <>

            <div class="page-content">
                <div class="header">Today Tasks</div>

                <div class="content-categories">
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-1" checked />
                        <label class="category" htmlFor="opt-1">All</label>
                    </div>
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-2" />
                        <label class="category" htmlFor="opt-2">Important</label>
                    </div>
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-3" />
                        <label class="category" htmlFor="opt-3">Notes</label>
                    </div>
                    <div class="label-wrapper">
                        <input class="nav-item" name="nav" type="radio" id="opt-4" />
                        <label class="category" htmlFor="opt-4">Links</label>
                    </div>
                </div>

                <div class="tasks-wrapper">
                    {
                        allTaskData.length > 0 ?
                            allTaskData?.map((item) => (
                                <AllTask
                                    taskId={item?._id}
                                    description={item.description}
                                    status={item.completed}
                                    isDeletedData={isDeletedData}
                                    setIsDeletedData={setIsDeletedData}
                                />
                            ))
                            :
                            <div>{errMsg}</div>
                    }
                </div>
            </div>
        </>
    )
}

export default Task
