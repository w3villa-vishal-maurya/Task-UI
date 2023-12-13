import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./style/task.css"
import Task from './Task'
import CreateTask from './CreateTask';
import UpcomingTask from './UpcomingTask';
import Meeting from './Meeting';
import { useNavigate } from 'react-router-dom';
import Layout from "./Layout";
import UserProfile from './UserProfile';
import UpdateTask from "./UpdateTask";





const TaskFrame = () => {
    const navigate = useNavigate();

    useEffect(() => {
        initMDB({ Dropdown, Collapse });
    }, [])

    const [isShowMeeting, setIsShowMeeting] = useState(false);

    return (
        <>
            <div className='task-manager'>
                <div className="left-bar">
                    <div className="left-content">

                        <ul className="action-list">
                            <li className="item item-p">
                                <img className="feather feather-star" src="svg/star.svg" alt="" />
                                <span onClick={() => navigate("/create-task")}>Create</span>
                            </li>
                            <li className="item item-p">
                                <img className="feather feather-inbox" src="../svg/inbox.svg" alt="" />
                                <span onClick={() => navigate("/all-task")}>Inbox</span>
                            </li>
                            <li className="item item-p">
                                <img className="feather feather-calendar" src="svg/calender.svg" alt="" />
                                <span onClick={() => navigate("/upcoming-task")}>Upcoming</span>
                            </li>
                            <li className="item item-p">
                                <img className="feather feather-users" src="svg/users.svg" alt="" />
                                <span onClick={() => setIsShowMeeting(!isShowMeeting)}>Meetings</span>
                            </li>


                            {/* <li className="item">
                                    <img className="feather feather-trash" src="svg/trash.svg" alt="" />
                                    <span>Trash</span>
                                </li> */}
                        </ul>

                    </div>

                    {/* <div className="upper-part">
                            <div className="actions">
                                <div className="circle"></div>
                                <div className="circle-2"></div>
                            </div>
                        </div> */}
                </div>

                <div className="page-content row  d-flex  align-items-center h-100">
                    {/* Use React Router to render the content dynamically */}
                    <Routes>
                        <Route path='/' element={<Layout />}>
                            <Route path="/create-task" element={<CreateTask />} />
                            <Route path="/all-task" element={<Task/>} />
                            <Route path="/upcoming-task" element={<UpcomingTask />} />
                            <Route path="/user-profile" element={<UserProfile />} />
                            <Route path="/update-task" element={<UpdateTask />} />
                        </Route>
                    </Routes>

                    {/* Render Meetings component based on the state */}
                </div>



                {isShowMeeting ? <Meeting /> : ""}


            </div >
        </>
    )
}

export default TaskFrame
