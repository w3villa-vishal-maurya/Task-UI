import React, { useEffect, useState, useContext } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import UpcomingTaskData from './UpcomingTaskData';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';


const PENDING_TASK = "/task/pending"

const UpcomingTask = () => {
    const { auth } = useContext(AuthContext);
    const [allPendingTaskData, setAllPendigTaskData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        async function getPendingData() {
            try {
                initMDB({ Dropdown, Collapse });

                const response = await axios.get(PENDING_TASK, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                if (response.data?.pendingTask.length) {
                    setAllPendigTaskData(response.data?.pendingTask);
                }
                else {
                    setErrMsg("You have no any upcoming task yet...");
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                }
                else if (err.response?.status === 400) {
                    setErrMsg('You have no any upcoming task yet...');
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

        getPendingData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="page-content">
                <div className="header upcoming">My Upcoming Tasks</div>
                <div className="tasks-wrapper">
                    {allPendingTaskData.length > 0 ?
                        allPendingTaskData.map((item) => (
                            <UpcomingTaskData
                                taskId={item._id}
                                description={item.description}
                                status={item.completed}
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

export default UpcomingTask
