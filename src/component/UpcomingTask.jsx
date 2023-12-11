import React, { useEffect, useState, useContext } from 'react'
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import UpcomingTaskData from './UpcomingTaskData';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';


const PENDING_TASK = "/task/pending"

const UpcomingTask = () => {
    const { auth, isLogin } = useContext(AuthContext);
    const [allPendingTaskData, setAllPendigTaskData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    const loginFrom = "/login";



    useEffect(() => {
        async function getPendingData() {
            try {
                initMDB({ Dropdown, Collapse });

                const response = await axios.get(PENDING_TASK, {
                    headers: { Authorization: auth.accessToken }
                });

                // Set the response data in state
                if(response.data?.pendingTask.length){
                    setAllPendigTaskData(response.data?.pendingTask);
                }
                else{
                    setErrMsg("You have no any upcoming task yet...");
                }
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('No server response');
                    navigate(loginFrom, { replace: true });
                }
                else if (err.response?.status === 400) {
                    setErrMsg('You have no any upcoming task yet...');
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
                    navigate(loginFrom, { replace: true });
                }

                // errRef.current.focus();
            }
        }


        if (!isLogin) {
            navigate(loginFrom, { replace: true });
        }
        else {
            getPendingData();
        }
    }, [])

    return (
        <>
            <div class="page-content">
                <div class="header upcoming">Upcoming Tasks</div>
                <div class="tasks-wrapper">
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
