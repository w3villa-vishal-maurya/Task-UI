import React, { useState, useContext, useEffect } from 'react';
import axios from "../api/axios"
import AuthContext from '../context/AuthProvider';
import AllTask from './AllTask';
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";


const SHOWALL_TASK = "/task/showall"

const Task = () => {
    const { auth } = useContext(AuthContext);

    const [allTaskData, setAllTaskData] = useState([]);
    const [isDeletedData, setIsDeletedData] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        async function getAllData() {
            try {
                initMDB({ Dropdown, Collapse });
                if(!dataFetched || isDeletedData) {
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

                    setDataFetched(true);
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

                // errRef.current.focus();
            }
        }

        getAllData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeletedData])

    return (
        <>

            <div className="page-content">
                <div className="header">All Tasks</div>

                <div className="content-categories">
                    <div className="label-wrapper">
                        <input className="nav-item" name="nav" type="radio" id="opt-1" checked />
                        <label className="category" htmlFor="opt-1">All</label>
                    </div>
                    <div className="label-wrapper">
                        <input className="nav-item" name="nav" type="radio" id="opt-2" />
                        <label className="category" htmlFor="opt-2">Completed</label>
                    </div>
                </div>

                <div className="tasks-wrapper">
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
